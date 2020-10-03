import { Op } from 'sequelize'

import Vehicle from '../models/Vehicle'
import File from '../models/File'

import removeFile from '../utils/removeFile'

class VehicleController {
  async index (req, res) {
    const { userProvider, userCompanyId } = req

    if (!userProvider) {
      return res
        .status(401)
        .json({ error: 'Usuário não tem permissão para listar os veículos' })
    }

    const {
      status,
      brand,
      board,
      model,
      year,
      page = 1,
      orderBy,
      sorting,
    } = req.query

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
    if (board)
      whereStatement.board = {
        [Op.iLike]: `%${board}%`,
      }
    if (year) whereStatement.year = year

    const orderQuery = orderBy || 'createdAt'
    const sortngQuery = sorting || 'DESC'

    const { count, rows } = await Vehicle.findAndCountAll({
      where: whereStatement,
      limit: 20,
      order: [[orderQuery, sortngQuery]],
      offset: (page - 1) * 20,
      include: [
        {
          model: File,
          as: 'files',
          attributes: ['name', 'path', 'url'],
          limit: 1,
        },
      ],
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
      const { board } = req.body

      if (!userProvider) {
        return res
          .status(401)
          .json({ error: 'Usuário não tem permissão criar veículos' })
      }

      const vehicleExist = await Vehicle.findOne({
        where: { board: board.toUpperCase(), company_id: userCompanyId },
      })

      if (vehicleExist) {
        return res.status(400).json({
          error: `Já existe um veículo com a placa ${board}`,
        })
      }

      const vehicle = await Vehicle.create({
        ...req.body,
        company_id: userCompanyId,
        year_model: req.body.year_model ? req.body.year_model : null,
        year: req.body.year ? req.body.year : null,
        km: req.body.km ? req.body.km : null,
        amount_oil: req.body.amount_oil ? req.body.amount_oil : null,
        value_purchase: req.body.value_purchase
          ? req.body.value_purchase
          : null,
        value_sale: req.body.value_sale ? req.body.value_sale : null,
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
      const { id, board } = req.body
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

      const vehicleExist = await Vehicle.findOne({
        where: {
          board: board.toUpperCase(),
          company_id: userCompanyId,
          id: {
            [Op.ne]: id,
          },
        },
      })

      if (vehicleExist) {
        return res.status(400).json({
          error: `Já existe um veículo com a placa ${board}`,
        })
      }

      await vehicle.update({
        ...req.body,
        year_model: req.body.year_model ? req.body.year_model : null,
        year: req.body.year ? req.body.year : null,
        km: req.body.km ? req.body.km : null,
        amount_oil: req.body.amount_oil ? req.body.amount_oil : null,
        value_purchase: req.body.value_purchase
          ? req.body.value_purchase
          : null,
        value_sale: req.body.value_sale ? req.body.value_sale : null,
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
      const files = await File.findAll({
        where: { vehicle_id: id },
      })

      files.map(x => removeFile(x.path))

      await Expense.destroy({
        where: { vehicle_id: vehicle.id },
      })
    }

    await Vehicle.destroy({
      where: { id },
    })

    return res.json('ok')
  }

  async list (req, res) {
    const { userProvider, userCompanyId } = req
    const { active } = req.query
    let whereStatement = {
      company_id: userCompanyId,
    }

    if (active !== '' && active !== undefined) whereStatement.active = active

    const vehicles = await Vehicle.findAll({
      where: whereStatement,
      order: [['createdAt', 'desc']],
      attributes: ['id', 'brand', 'model', 'board'],
    })

    function formatLabel (v) {
      return v.brand != null
        ? `${v.brand} ${v.model} ${v.board}`
        : `${v.model} ${v.board}`
    }

    const vehiclesFormated = vehicles.map(v => ({
      id: v.id,
      title: formatLabel(v),
      value: v.id,
      label: formatLabel(v),
    }))

    return res.json(vehiclesFormated)
  }
}

export default new VehicleController()
