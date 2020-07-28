import { Op } from 'sequelize'

import Company from '../models/Company'
import removeFile from '../utils/removeFile'

class CompanyController {
  async index (req, res) {
    // return res.json({
    //   userId: req.userId,
    //   userProvider: req.userProvider,
    //   userCompanyId: req.userCompanyId,
    //   userCompanyProvider: req.userCompanyProvider,
    // });
    const { userCompanyProvider, userProvider, userCompanyId } = req

    if (!userCompanyProvider || !userProvider) {
      return res
        .status(401)
        .json({ error: 'Usuário não tem permissão para listar as lojas' })
    }

    const { name, email, site, page = 1 } = req.query
    const companies = await Company.findAll({
      where: {
        id: {
          [Op.ne]: userCompanyId,
        },
        // name: {
        //   [Op.iLike]: `%${name || ''}%`,
        // },
        // site: {
        //   [Op.iLike]: `%${site || ''}%`,
        // },
        // email: {
        //   [Op.iLike]: `%${email || ''}%`,
        // },
        provider: false,
      },
      limit: 20,
      order: ['name'],
      offset: (page - 1) * 20,
    })

    return res.json(companies)
  }

  async find (req, res) {
    const { id } = req.params

    const { userProvider, userCompanyId, userCompanyProvider } = req
    // return res.json({
    //   userProvider,
    //   userCompanyId,
    //   id: Number(id),
    // });
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
    console.log(req.body)
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
    const company = await Company.create({ ...req.body, image })

    return res.json(company)
  }

  async update (req, res) {
    console.log(req.body)
    const { email, id } = req.body
    const { userCompanyProvider, userProvider, userCompanyId } = req

    if (!userProvider) {
      return res
        .status(401)
        .json({ error: 'Usuário não tem permissão alterar lojas' })
    }

    if (!userCompanyProvider && userCompanyId !== id) {
      return res
        .status(401)
        .json({ error: 'Você não possui permissão para alterar esta loja' })
    }
    const company = await Company.findByPk(id)
    // return res.json({me:'chegou aqui',obj:company})

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
}

export default new CompanyController()
