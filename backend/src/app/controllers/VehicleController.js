import { Op } from 'sequelize'

import Vehicle from '../models/Vehicle'
import removeFile from '../utils/removeFile'
import getExpireDate from '../utils/addDays'

class VehicleController {
  async index (req, res) {
    const { userCompanyProvider, userProvider, userCompanyId } = req

    if (!userProvider) {
      return res
        .status(401)
        .json({ error: 'Usuário não tem permissão para listar os veículos' })
    }

    const { status, name, page = 1 } = req.query

    let whereStatement = {
      company_id: userCompanyId,
    }

    if (status !== '' && status !== undefined) whereStatement.active = status

    if (name)
      whereStatement.name = {
        [Op.iLike]: `%${name}%`,
      }

    const vehicles = await Vehicle.findAll({
      where: whereStatement,
      limit: 20,
      order: ['name'],
      offset: (page - 1) * 20,
    })

    return res.json(vehicles)
  }

  async find (req, res) {
    const { id } = req.params

    const { userProvider, userCompanyId, userCompanyProvider } = req

    if (!userCompanyProvider) {
      if (!userProvider || userCompanyId !== Number(id)) {
        return res
          .status(401)
          .json({ error: 'Usuário não permissão ver este veículo' })
      }
    }

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
    console.log(req.body)
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

      await vehicle.update({ ...req.body })

      const { name } = await Vehicle.findByPk(id)

      return res.json({ id, name })
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
        error: 'Você não possui permissão para alterar este veículo',
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
