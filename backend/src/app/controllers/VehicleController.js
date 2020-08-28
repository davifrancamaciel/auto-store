import { Op } from 'sequelize'

import Vehicle from '../models/Vehicle'
import removeFile from '../utils/removeFile'

class VehicleController {
  async index (req, res) {
    const { userProvider, userCompanyId } = req

    if (!userProvider) {
      return res
        .status(401)
        .json({ error: 'Usuário não tem permissão para listar os veículos' })
    }

    const { status, brand, model, year, page = 1 } = req.query

    let whereStatement = {
      company_id: userCompanyId,
    }

    if (status !== '' && status !== undefined) whereStatement.active = status

    if (brand)
      whereStatement.brand = {
        [Op.iLike]: `%${brand}%`,
      }
    if (model)
      whereStatement.model = {
        [Op.iLike]: `%${model}%`,
      }
    if (year) whereStatement.year = year

    const { count, rows } = await Vehicle.findAndCountAll({
      where: whereStatement,
      limit: 20,
      order: [['createdAt', 'DESC']],
      offset: (page - 1) * 20,
    })

    res.header('X-Total-Count', count)

    return res.json({ count, rows })
  }

  async find (req, res) {
    const { id } = req.params

    const { userProvider, userCompanyId, userCompanyProvider } = req

    const vehicle = await Vehicle.findByPk(id)
    if (!vehicle) {
      return res.status(400).json({ error: 'Veículo não encontrado' })
    }

    if (!userCompanyProvider) {
      if (vehicle.company_id != userCompanyId) {
        return res
          .status(401)
          .json({ error: 'Usuário não permissão ver este veículo' })
      }
    }

    return res.json(vehicle)
  }

  async store (req, res) {
    try {
      const { userCompanyProvider, userProvider, userCompanyId } = req

      if (!userProvider) {
        return res
          .status(401)
          .json({ error: 'Usuário não tem permissão criar veículos' })
      }

      const vehicle = await Vehicle.create({
        ...req.body,
        company_id: userCompanyId,
        year_model: req.body.year_model ? req.body.year_model : null,
        year: req.body.year ? req.body.year : null,
        km: req.body.km ? req.body.km : null,
        amount_oil: req.body.amount_oil ? req.body.amount_oil : null,
        value: req.body.value ? req.body.value : null,
      })

      return res.json(vehicle)
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
    try {
      const { id } = req.body
      const { userCompanyProvider, userProvider, userCompanyId } = req

      const vehicle = await Vehicle.findByPk(id)

      if (!vehicle) {
        return res.status(400).json({ error: 'Veículo não encontrado' })
      }

      if (!userCompanyProvider && userCompanyId !== vehicle.company_id) {
        return res.status(401).json({
          error: 'Você não possui permissão para alterar este veículo',
        })
      }

      await vehicle.update({
        ...req.body,
        year_model: req.body.year_model ? req.body.year_model : null,
        year: req.body.year ? req.body.year : null,
        km: req.body.km ? req.body.km : null,
        amount_oil: req.body.amount_oil ? req.body.amount_oil : null,
        value: req.body.value ? req.body.value : null,
      })

      const { model } = await Vehicle.findByPk(id)

      return res.json({ id, model })
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

    if (!userProvider) {
      return res
        .status(401)
        .json({ error: 'Usuário não tem permissão para deletar os veículos' })
    }

    const { id } = req.params

    const vehicle = await Vehicle.findByPk(id)

    if (!vehicle) {
      return res.status(400).json({ error: 'Veículo não encontrado' })
    }

    if (!userCompanyProvider && userCompanyId !== vehicle.company_id) {
      return res.status(401).json({
        error: 'Não é possivel excluir um registro de outra loja',
      })
    }

    if (vehicle) {
      removeFile(vehicle.image)
    }

    await Vehicle.destroy({
      where: { id },
    })

    return res.json('ok')
  }
}

export default new VehicleController()
