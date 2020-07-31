import { Op } from 'sequelize'

import Company from '../models/Company'
import User from '../models/User'
import removeFile from '../utils/removeFile'

class UserController {
  async index (req, res) {
    const { userCompanyProvider, userProvider, userCompanyId } = req

    const { name, email, provider, company_id, page = 1 } = req.query
    console.log(provider)
    let params = {
      name: {
        [Op.iLike]: `%${name || ''}%`,
      },
      email: {
        [Op.iLike]: `%${email || ''}%`,
      },
    }

    // return res.json({ userProvider, userCompanyId, userCompanyProvider });

    if (!userProvider) {
      return res
        .status(401)
        .json({ error: 'Usuário não tem permissão para listar os usuários' })
    }

    let users = []
    if (!userCompanyProvider) {
      params = {
        ...params,
        company_id: userCompanyId,
      }
    }

    users = await User.findAll({
      where: params,

      limit: 20,
      order: ['name'],
      offset: (page - 1) * 20,
    })
    return res.json(users)
  }

  async find (req, res) {
    const { id } = req.params
    const { userProvider, userCompanyId, userCompanyProvider } = req
    if (!userCompanyProvider) {
      if (!userProvider || userCompanyId !== Number(id)) {
        return res
          .status(401)
          .json({ error: 'Usuário não permissão ver esta usuario' })
      }
    }

    const user = await User.findByPk(id)
    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado' })
    }

    return res.json(user)
  }

  async store (req, res) {
    const { userCompanyProvider, userProvider, userCompanyId } = req

    if (!userProvider) {
      return res
        .status(401)
        .json({ error: 'Usuário não tem permissão para listar as lojas' })
    }

    const userExist = await User.findOne({
      where: { email: req.body.email },
    })

    if (userExist) {
      return res
        .status(400)
        .json({ error: 'Já existe um usuário com este email' })
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
    const { email, oldPassword } = req.body
    const user = await User.findByPk(req.userId)

    if (user.email !== email) {
      const userExist = await User.findOne({ where: { email } })
      if (userExist) {
        return res
          .status(400)
          .json({ error: 'Já existe um usuário com este email' })
      }
    }
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'A Senha antiga está icorreta' })
    }
    const userUpdate = req.body
    if (!userProvider) {
      userUpdate.provider = false
      userUpdate.company_id = userCompanyId
    }
    if (userProvider && !userCompanyProvider) {
      userUpdate.company_id = userCompanyId
    }

    const image = (req.file && req.file.filename) || user.image
    if (image !== user.image) {
      removeFile(user.image)
    }

    await user.update({ ...userUpdate, image })

    const {
      id,
      name,
      provider,
      company_id,
      whatsapp,
    } = await User.findByPk(req.userId)

    return res.json({
      id,
      name,
      image,
      email,
      provider,
      company_id,
      company_provider: userCompanyProvider,
      whatsapp,
    })
  }
}

export default new UserController()
