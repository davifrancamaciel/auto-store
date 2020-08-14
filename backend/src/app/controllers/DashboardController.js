import Company from '../models/Company'
import User from '../models/User'

class DashboardController {
  async index (req, res) {
    const { userCompanyProvider, userProvider, userCompanyId } = req

    const company = await Company.findOne({
      where: { id: userCompanyId },
      attributes: ['name', 'expires_at'],
    })

    const model = { company }

    return res.json(model)
  }
}
export default new DashboardController()
