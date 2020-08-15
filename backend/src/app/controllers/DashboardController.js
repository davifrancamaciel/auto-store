import Company from '../models/Company'
import User from '../models/User'
import Sequelize, { QueryTypes } from 'sequelize'

class DashboardController {
  async index (req, res) {
    const { userCompanyProvider, userProvider, userCompanyId } = req

    const company = await Company.findOne({
      where: { id: userCompanyId },
      attributes: ['name', 'expires_at'],
    })

    const companiesActive = await Company.count({
      where: { provider: false, active: true },
    })
    const companiesInactive = await Company.count({
      where: { provider: false, active: false },
    })

    const clientsActive = await User.count({
      where: { provider: false, active: true },
    })
    const clientsInactive = await User.count({
      where: { provider: false, active: false },
    })

    const model = {
      company,
      companies: {
        active: companiesActive,
        inactive: companiesInactive,
      },
      clients: {
        active: clientsActive,
        inactive: clientsInactive,
      },
    }

    return res.json(model)
  }
}
export default new DashboardController()
