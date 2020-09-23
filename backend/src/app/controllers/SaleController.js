import Company from '../models/Company'
import User from '../models/User'
import Vehicle from '../models/Vehicle'
import Sale from '../models/Sale'

class SaleController{
  async store (req, res) {
    try {
      const { userProvider, userCompanyId } = req

      if (!userProvider) {
        return res
          .status(401)
          .json({ error: 'Usuário não tem permissão criar vendas' })
      }

      const sale = await Sale.create({
        ...req.body,
        company_id: userCompanyId,
      })

      return res.json(sale)
    } catch (error) {
      return res
        .status(500)
        .json({ error: 'Ocoreu um erro interno', messages: error.inner })
    }
  }

}

export default new SaleController()
