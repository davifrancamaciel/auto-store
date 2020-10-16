import { Op } from 'sequelize'

import Expense from '../../models/Expense'
import ExpenseType from '../../models/ExpenseType'
import Vehicle from '../../models/Vehicle'
import { startOfDay, endOfDay, parseISO } from 'date-fns'

class ExpenseIndexService {
  async run ({
    description,
    expense_type_id,
    start_date,
    end_date,
    page,
    company_id,
    orderBy,
    sorting,
    vehicle_id,
    limit,
    constant,
  }) {
    let whereStatement = {
      company_id,
    }
    let whereStatementType = {}

    if (!vehicle_id)
      whereStatementType.constant = {
        [Op.notIn]: [
          'DESPESA_VEICULO_VENDIDO',
          'DESPESA_VEICULO_NAO_VENDIDO',
          'MULTA_PAGA',
          'MULTA_NAO_PAGA',
        ],
      }

    if (vehicle_id) whereStatement.vehicle_id = vehicle_id

    if (expense_type_id) whereStatement.expense_type_id = expense_type_id

    if (constant) whereStatementType.constant = constant

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

    const { count, rows } = await Expense.findAndCountAll({
      where: whereStatement,
      limit: limit ? limit : 20,
      order: [[orderQuery, sortngQuery]],
      offset: (page - 1) * 20,
      include: [
        {
          model: ExpenseType,
          as: 'type',
          attributes: ['name'],
          where: whereStatementType,
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

export default new ExpenseIndexService()
