import { Op } from 'sequelize'

import Company from '../models/Company'
import User from '../models/User'
import removeFile from '../utils/removeFile'

class UserController {
  async index (req, res) {
    const { userCompanyProvider, userProvider, userCompanyId } = req

    if (!userProvider) {
      return res
        .status(401)
        .json({ error: 'Usuário não tem permissão para listar os usuários' })
    }

    const {
      name,
      email,
      provider,
      company_id,
      provider_company,
      company_name,
      page = 1,
    } = req.query

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

    const { count, rows } = await User.findAndCountAll({
      where: whereStatement,
      limit: 20,
      order: [['createdAt', 'DESC']],
      offset: (page - 1) * 20,
      attributes: [
        'id',
        'name',
        'image',
        'email',
        'whatsapp',
        'phone',
        'zip_code',
        'uf',
        'city',
        'district',
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

    res.header('X-Total-Count', count)

    return res.json({ count, rows })
  }

  async find (req, res) {
    const { id } = req.params
    const { userProvider, userCompanyId, userCompanyProvider } = req

    const user = await User.findByPk(id)
    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado' })
    }

    if (!userCompanyProvider) {
      if (!userProvider || userCompanyId !== user.company_id) {
        return res
          .status(401)
          .json({ error: 'Usuário não permissão ver este usuario' })
      }
    }

    return res.json(user)
  }

  async store (req, res) {
    const { userCompanyProvider, userProvider, userCompanyId } = req

    if (!userProvider) {
      return res
        .status(401)
        .json({ error: 'Usuário não tem permissão para criar' })
    }

    const userExist = await User.findOne({
      where: { email: req.body.email },
    })

    if (userExist) {
      return res.status(400).json({
        error: `Já existe um ${
          req.body.provider ? 'usuário' : 'cliente'
        } com este email`,
      })
    }
    let { company_id } = req.body

    if (!userCompanyProvider) {
      company_id = userCompanyId
    }

    const newUser = {
      ...req.body,
      company_id,
    }

    const companyExist = await Company.findByPk(company_id)

    if (!companyExist) {
      return res.status(400).json({ error: 'A Loja selecionada não existe' })
    }

    const { id, name, email, provider, whatsapp, city, uf } = await User.create(
      newUser
    )

    return res.json({
      id,
      name,
      email,
      provider,
      whatsapp,
      city,
      uf,
      company_id,
    })
  }

  async update (req, res) {
    const { userCompanyProvider, userProvider, userCompanyId } = req
    const { id, email } = req.body
    const user = await User.findByPk(id)

    if (user.email !== email) {
      const userExist = await User.findOne({ where: { email } })
      if (userExist) {
        return res.status(400).json({
          error: `Já existe um ${
            req.body.provider ? 'usuário' : 'cliente'
          } com este email`,
        })
      }
    }

    const userUpdate = req.body
    if (!userProvider) {
      userUpdate.provider = false
      userUpdate.company_id = userCompanyId
    }
    if (userProvider && !userCompanyProvider) {
      userUpdate.company_id = userCompanyId
    }

    await user.update(userUpdate)

    const { name, provider, company_id, whatsapp } = await User.findByPk(id)

    return res.json({
      id,
      name,
      email,
      provider,
      company_id,
      company_provider: userCompanyProvider,
      whatsapp,
    })
  }

  async delete (req, res) {
    const { userCompanyProvider, userProvider, userCompanyId } = req

    if (!userProvider) {
      return res
        .status(401)
        .json({ error: 'Usuário não tem permissão para deletar' })
    }

    const { id } = req.params

    if (Number(id) === Number(req.userId)) {
      return res
        .status(401)
        .json({ error: 'Você não pode remover o seu próprio registro' })
    }

    const user = await User.findByPk(id)

    if (!userProvider) {
      return res.status(400).json({ error: 'Registo não encontrado' })
    }

    if (!userCompanyProvider && user.company_id != userCompanyId) {
      return res
        .status(401)
        .json({ error: 'Não é possivel deletar um registro de outra loja' })
    }

    if (user) {
      removeFile(user.image)
    }

    await User.destroy({ where: { id } })

    return res.json({ message: `${user.name} deletado` })
  }
}

export default new UserController()
