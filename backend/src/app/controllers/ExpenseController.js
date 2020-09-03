import Expense from '../models/Expense'
import ExpenseIndexService from '../services/expense/index'

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
      orderBy,
      sorting
    } = req.query

    const { count, rows } = await ExpenseIndexService.run({
      description,
      expense_type_id,
      start_date,
      end_date,
      page,
      orderBy,
      sorting,
      company_id: userCompanyId,
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
