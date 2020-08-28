import { Op } from 'sequelize'

import Expense from '../../models/Expense'
import ExpenseType from '../../models/ExpenseType'
import { startOfDay, endOfDay, parseISO } from 'date-fns'

class ExpenseIndexService {
  async run ({
    description,
    expense_type_id,
    start_date,
    end_date,
    page,
    company_id,
  }) {
    let whereStatement = {
      company_id,
    }

    if (expense_type_id) whereStatement.expense_type_id = expense_type_id

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

    const { count, rows } = await Expense.findAndCountAll({
      where: whereStatement,
      limit: 20,
      order: [['createdAt', 'DESC']],
      offset: (page - 1) * 20,
      include: [
        {
          model: ExpenseType,
          as: 'type',
          attributes: ['name'],
        },
      ],
    })

    return { count, rows }
  }
}

export default new ExpenseIndexService()
