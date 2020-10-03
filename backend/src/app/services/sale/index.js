import { Op } from 'sequelize'

import Sale from '../../models/Sale'
import User from '../../models/User'
import Vehicle from '../../models/Vehicle'
import { startOfDay, endOfDay, parseISO } from 'date-fns'

class SaleIndexService {
  async run ({ query, company_id }) {
    const {
      description,
      user_id,
      start_date,
      end_date,
      page = 1,
      orderBy,
      sorting,
      vehicle_id,
      limit,
    } = query

    let whereStatement = {
      company_id,
    }

    if (vehicle_id) whereStatement.vehicle_id = vehicle_id

    if (user_id) whereStatement.user_id = user_id

    if (description)
      whereStatement.description = {
        [Op.iLike]: `%${description}%`,
      }

    if (start_date)
      whereStatement.createdAt = {
        [Op.gte]: startOfDay(parseISO(start_date)),
      }
    if (end_date)
      whereStatement.createdAt = {
        [Op.lte]: endOfDay(parseISO(end_date)),
      }
    if (start_date && end_date)
      whereStatement.createdAt = {
        [Op.between]: [
          startOfDay(parseISO(start_date)),
          endOfDay(parseISO(end_date)),
        ],
      }

    const orderQuery = orderBy || 'createdAt'
    const sortngQuery = sorting || 'DESC'

    const { count, rows } = await Sale.findAndCountAll({
      where: whereStatement,
      limit: limit ? limit : 20,
      order: [[orderQuery, sortngQuery]],
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
        {
          model: Vehicle,
          as: 'vehicle',
          attributes: ['model', 'brand'],
        },
      ],
    })

    return { count, rows }
  }
}

export default new SaleIndexService()
