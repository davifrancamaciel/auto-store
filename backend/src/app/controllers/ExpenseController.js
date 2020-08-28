import { Op } from 'sequelize'

import Expense from '../models/Expense'
import ExpenseType from '../models/ExpenseType'
import { startOfDay, endOfDay, parseISO } from 'date-fns'

class ExpenseController {
  async index (req, res) {
    const { userProvider, userCompanyId } = req

    if (!userProvider) {
      return res
        .status(401)
        .json({ error: 'Usuário não tem permissão para listar os despesas' })
    }

    const {
      description,
      expense_type_id,
      start_date,
      end_date,
      page = 1,
    } = req.query

    let whereStatement = {
      company_id: userCompanyId,
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

    res.header('X-Total-Count', count)

    return res.json({ count, rows })
  }

  async find (req, res) {
    const { id } = req.params

    const { userCompanyId, userCompanyProvider } = req

    const expense = await Expense.findByPk(id)
    if (!expense) {
      return res.status(400).json({ error: 'despesa não encontrada' })
    }

    if (!userCompanyProvider) {
      if (expense.company_id != userCompanyId) {
        return res
          .status(401)
          .json({ error: 'Usuário não permissão ver esta despesa' })
      }
    }

    return res.json(expense)
  }

  async store (req, res) {
    try {
      const { userProvider, userCompanyId } = req

      if (!userProvider) {
        return res
          .status(401)
          .json({ error: 'Usuário não tem permissão criar despesas' })
      }

      const expense = await Expense.create({
        ...req.body,
        company_id: userCompanyId,
      })

      return res.json(expense)
    } catch (error) {
      return res
        .status(500)
        .json({ error: 'Ocoreu um erro interno', messages: error.inner })
    }
  }

  async update (req, res) {
    try {
      const { id } = req.body
      const { userCompanyProvider, userCompanyId } = req

      const expense = await Expense.findByPk(id)

      if (!expense) {
        return res.status(400).json({ error: 'despesa não encontrada' })
      }

      if (!userCompanyProvider && userCompanyId !== expense.company_id) {
        return res.status(401).json({
          error: 'Você não possui permissão para alterar esta despesa',
        })
      }

      await expense.update({
        ...req.body,
        company_id: userCompanyId,
      })

      const expenseEdited = await Expense.findByPk(id)

      return res.json(expenseEdited)
    } catch (error) {
      return res
        .status(500)
        .json({ error: 'Ocoreu um erro interno', messages: error })
    }
  }

  async delete (req, res) {
    const { userCompanyProvider, userProvider, userCompanyId } = req

    if (!userProvider) {
      return res
        .status(401)
        .json({ error: 'Usuário não tem permissão para deletar as despesas' })
    }

    const { id } = req.params

    const expense = await Expense.findByPk(id)

    if (!expense) {
      return res.status(400).json({ error: 'despesa não encontrada' })
    }

    if (!userCompanyProvider && userCompanyId !== expense.company_id) {
      return res.status(401).json({
        error: 'Não é possivel excluir um registro de outra loja',
      })
    }

    await Expense.destroy({
      where: { id },
    })

    return res.json('ok')
  }
}

export default new ExpenseController()
