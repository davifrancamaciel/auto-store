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

    // const companiesCount = await Company.count({
    //   where: { provider: false },
    //   attributes: ['name', 'expires_at'],
    // })
    // const companiesCount = await Company.findAll({
    //   where: { provider: false },
    //   attributes: {
    //     attributes: [],
    //     include: [[Sequelize.fn('COUNT', Sequelize.col('companies.id')), 'total']],

    //   },
    //   include: [
    //     {
    //       model: Sensor,
    //       attributes: [],
    //     },
    //   ],
    // })
    // const users = await Sequelize.query("SELECT * FROM `users`", { type: QueryTypes.SELECT })

    // await Sequelize.query(
    //   'SELECT COUNT(c.id) FROM companies as c WHERE provider = $provider',
    //   'SELECT *, "text with literal $$1 and literal $$status" as t FROM projects WHERE status = $status',
    //   {
    //     bind: { provider: false },
    //     type: QueryTypes.SELECT
    //   }
    // );

    const model = {
      company,
      // companiesCount
    }

    return res.json(model)
  }
}
export default new DashboardController()
