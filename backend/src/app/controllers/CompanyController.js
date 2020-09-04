import { Op } from 'sequelize'

import Company from '../models/Company'
import removeFile from '../utils/removeFile'
import getExpireDate from '../utils/addDays'

class CompanyController {
  async index (req, res) {
    const { userCompanyProvider, userProvider, userCompanyId } = req

    if (!userCompanyProvider || !userProvider) {
      return res
        .status(401)
        .json({ error: 'Usuário não tem permissão para listar as lojas' })
    }

    const { status, name, email, page = 1, orderBy, sorting } = req.query

    let whereStatement = {
      id: {
        [Op.ne]: userCompanyId,
      },
      provider: false,
    }

    if (status !== '' && status !== undefined) whereStatement.active = status

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

    const { count, rows } = await Company.findAndCountAll({
      where: whereStatement,
      limit: 20,
      order: [[orderQuery, sortngQuery]],
      offset: (page - 1) * 20,
    })

    res.header('X-Total-Count', count)

    return res.json({ count, rows })
  }

  async find (req, res) {
    const { id } = req.params

    const { userProvider, userCompanyId, userCompanyProvider } = req

    if (!userCompanyProvider) {
      if (!userProvider || userCompanyId !== Number(id)) {
        return res
          .status(401)
          .json({ error: 'Usuário não permissão ver esta loja' })
      }
    }

    const company = await Company.findByPk(id)
    if (!company) {
      return res.status(400).json({ error: 'Loja não encontrada' })
    }

    return res.json(company)
  }

  async store (req, res) {
    try {
      const { email } = req.body
      const { userCompanyProvider, userProvider } = req

      if (!userCompanyProvider || !userProvider) {
        return res
          .status(401)
          .json({ error: 'Usuário não tem permissão criar lojas' })
      }

      const companyExist = await Company.findOne({
        where: { email },
      })

      if (companyExist) {
        return res
          .status(400)
          .json({ error: 'Já existe uma loja com este email' })
      }
      const image = (req.file && req.file.filename) || null
      const expires_at = req.body.expires_at
        ? req.body.expires_at
        : getExpireDate(process.env.DAYS_EXPIRES)
      const company = await Company.create({ ...req.body, expires_at, image })

      return res.json(company)
    } catch (error) {
      if (req.file && req.file.filename) {
        removeFile(req.file.filename)
      }
      return res
        .status(500)
        .json({ error: 'Ocoreu um erro interno', messages: error.inner })
    }
  }

  async update (req, res) {
    console.log(req.body)
    try {
      const { email, id } = req.body
      const { userCompanyProvider, userProvider, userCompanyId } = req

      if (!userProvider) {
        return res
          .status(401)
          .json({ error: 'Usuário não tem permissão alterar lojas' })
      }

      if (!userCompanyProvider && Number(userCompanyId) !== Number(id)) {
        return res
          .status(401)
          .json({ error: 'Você não possui permissão para alterar esta loja' })
      }
      const company = await Company.findByPk(id)

      if (company.email !== email) {
        const companyExist = await Company.findOne({ where: { email } })
        if (companyExist) {
          return res
            .status(400)
            .json({ error: 'Já existe uma loja com este email' })
        }
      }

      const image = (req.file && req.file.filename) || company.image
      if (image !== company.image) {
        removeFile(company.image)
      }

      await company.update({ ...req.body, image })

      const { name, provider, whatsapp, city, uf } = await Company.findByPk(id)

      return res.json({ id, name, email, provider, whatsapp, city, uf })
    } catch (error) {
      if (req.file && req.file.filename) {
        removeFile(req.file.filename)
      }
      return res
        .status(500)
        .json({ error: 'Ocoreu um erro interno', messages: error.inner })
    }
  }

  async delete (req, res) {
    const { userCompanyProvider, userProvider, userCompanyId } = req

    if (!userCompanyProvider || !userProvider) {
      return res
        .status(401)
        .json({ error: 'Usuário não tem permissão para deletar as lojas' })
    }

    const { id } = req.params

    const company = await Company.findByPk(id)
    if (company) {
      removeFile(company.image)
    }

    const companies = await Company.destroy({
      where: { id },
    })

    return res.json(companies)
  }

  async list (req, res) {
    const { userCompanyProvider, userProvider, userCompanyId } = req

    if (!userCompanyProvider || !userProvider) {
      return res
        .status(401)
        .json({ error: 'Usuário não tem permissão para listar as lojas' })
    }

    const { active } = req.query

    let whereStatement = {
      provider: Boolean(false),
    }
    if (active != undefined) whereStatement.active = Boolean(active)

    const companies = await Company.findAll({
      where: whereStatement,
      order: ['name'],
      attributes: ['id', 'name', 'active'],
    })

    const companyFormated = companies.map(c => ({
      id: c.id,
      title: c.name,
      value: c.id,
      label: c.name,
      name: c.name,
      active: c.active,
    }))

    return res.json(companyFormated)
  }
}

export default new CompanyController()
