import { Op } from 'sequelize'
import ExpenseType from '../models/ExpenseType'
import ExpenseTypeEnum from '../enums/expenseTypes'

class ExpenseTypeController {
  async index (req, res) {
    const types = await ExpenseType.findAll({
      order: ['name'],
      attributes: ['id', 'name'],
      where: {
        id: {
          [Op.notIn]: [
            ExpenseTypeEnum.DESPESA_VEICULO_VENDIDO,
            ExpenseTypeEnum.DESPESA_VEICULO_NAO_VENDIDO,
            ExpenseTypeEnum.MULTA_PAGA,
            ExpenseTypeEnum.MULTA_NAO_PAGA,
          ],
        },
      },
    })

    const typesFormated = types.map(c => ({
      id: c.id,
      title: c.name,
      value: c.id,
      label: c.name,
    }))

    return res.json(typesFormated)
  }
}

export default new ExpenseTypeController()
