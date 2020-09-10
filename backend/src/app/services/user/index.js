import { Op } from 'sequelize'

import Company from '../../models/Company'
import User from '../../models/User'

class UserIndexService {
  async run ({
    name,
    email,
    provider,
    company_id,
    provider_company,
    company_name,
    page,
    userCompanyProvider,
    userCompanyId,
    orderBy,
    sorting,
  }) {
    let whereStatementCompany = {}

    if (provider_company) whereStatementCompany.provider = provider_company

    if (company_name)
      whereStatementCompany.name = {
        [Op.iLike]: `%${company_name}%`,
      }

    let whereStatement = {}

    if (provider != undefined) whereStatement.provider = provider

    if (company_id) whereStatement.company_id = company_id

    if (!userCompanyProvider) whereStatement.company_id = userCompanyId

    if (name)
      whereStatement.name = {
        [Op.iLike]: `%${name}%`,
      }

    if (email)
      whereStatement.email = {
        [Op.iLike]: `%${email}%`,
      }

    const orderQuery = orderBy || 'createdAt'
    const sortngQuery = sorting || 'DESC'

    const { count, rows } = await User.findAndCountAll({
      where: whereStatement,
      limit: 20,
      order: [[orderQuery, sortngQuery]],
      offset: (page - 1) * 20,
      attributes: [
        'id',
        'name',
        'image',
        'email',
        'whatsapp',
        'phone',
        'zip_code',
        'state',
        'city',
        'neighborhood',
        'street',
        'provider',
        'active',
      ],
      include: [
        {
          model: Company,
          as: 'company',
          attributes: ['name'],
          where: whereStatementCompany,
        },
      ],
    })

    return { count, rows }
  }
}

export default new UserIndexService()
