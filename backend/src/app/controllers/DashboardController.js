import Company from '../models/Company'
import User from '../models/User'
import Vehicle from '../models/Vehicle'

class DashboardController {
  async index (req, res) {
    const { userCompanyProvider, userProvider, userCompanyId } = req

    try {
      let whereStatement = {}
      let companiesInactive = 0
      let companiesActive = 0
      let company = null

      if (!userCompanyProvider) whereStatement.company_id = userCompanyId

      if (userCompanyProvider) {
        companiesActive = await Company.count({
          where: { provider: false, active: true },
        })
        companiesInactive = await Company.count({
          where: { provider: false, active: false },
        })
      } else {
        company = await Company.findOne({
          where: { id: userCompanyId },
          attributes: ['name', 'expires_at'],
        })
      }

      const clientsActive = await User.count({
        where: { ...whereStatement, provider: false, active: true },
      })
      const clientsInactive = await User.count({
        where: { ...whereStatement, provider: false, active: false },
      })

      const vehiclesActive = await Vehicle.count({
        where: { ...whereStatement, active: true },
      })
      const vehiclesInactive = await Vehicle.count({
        where: { ...whereStatement, active: false },
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
        vehicles: {
          active: vehiclesActive,
          inactive: vehiclesInactive,
        },
      }

      return res.json(model)
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno', error })
    }
  }
}
export default new DashboardController()
