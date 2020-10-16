import { Op } from 'sequelize'
import ExpenseType from '../models/ExpenseType'

class ExpenseTypeController {
  async index (req, res) {
    const types = await ExpenseType.findAll({
      order: ['name'],
      attributes: ['id', 'name'],
      where: {
        constant: {
          [Op.notIn]: [
            'DESPESA_VEICULO_VENDIDO',
            'DESPESA_VEICULO_NAO_VENDIDO',
            'MULTA_PAGA',
            'MULTA_NAO_PAGA',
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
