import Company from '../models/Company'
import User from '../models/User'
import Vehicle from '../models/Vehicle'
import Sale from '../models/Sale'
import SaleIndexService from '../services/sale/index'

class SaleController {
  async index (req, res) {
    const { userProvider, userCompanyId } = req

    if (!userProvider) {
      return res
        .status(401)
        .json({ error: 'Usuário não tem permissão para listar as vendas' })
    }

    const { query } = req

    const { count, rows } = await SaleIndexService.run({
      query,
      company_id: userCompanyId,
    })

    res.header('X-Total-Count', count)

    return res.json({ count, rows })
  }

  async find (req, res) {
    const { id } = req.params

    const { userCompanyId, userCompanyProvider } = req

    const sale = await Sale.findOne({
      where: { id },
      include: [
        {
          model: User,
          as: 'user',
          attributes: [
            'name',
            'email',
            'phone',
            'cpf_cnpj',
            'cnh',
            'rg',
            'profession',
            'birth_date',
            'zip_code',
            'state',
            'city',
            'neighborhood',
          ],
        },
        {
          model: Vehicle,
          as: 'vehicle',
          attributes: [
            'brand',
            'model',
            'year',
            'year_model',
            'board',
            'km',
            'value_sale',
            'optional',
            'color',
            'renavan',
          ],
        },
      ],
    })
    if (!sale) {
      return res.status(400).json({ error: 'Venda não encontrada' })
    }

    if (!userCompanyProvider) {
      if (sale.company_id != userCompanyId) {
        return res
          .status(401)
          .json({ error: 'Usuário não permissão ver esta venda' })
      }
    }

    return res.json(sale)
  }

  async store (req, res) {
    try {
      const { userProvider, userCompanyId } = req

      if (!userProvider) {
        return res
          .status(401)
          .json({ error: 'Usuário não tem permissão criar vendas' })
      }

      const sale = await Sale.create({
        ...req.body,
        company_id: userCompanyId,
      })

      return res.json(sale)
    } catch (error) {
      return res
        .status(500)
        .json({ error: 'Ocoreu um erro interno', messages: error.inner })
    }
  }

  async update (req, res) {
    try {
      const { id } = req.body
      const { userCompanyProvider, userCompanyId } = req

      const sale = await Sale.findByPk(id)

      if (!sale) {
        return res.status(400).json({ error: 'Venda não encontrada' })
      }

      if (!userCompanyProvider && userCompanyId !== sale.company_id) {
        return res.status(401).json({
          error: 'Você não possui permissão para alterar esta venda',
        })
      }

      await sale.update({
        ...req.body,
        company_id: userCompanyId,
      })

      const saleEdited = await Sale.findByPk(id)

      return res.json(saleEdited)
    } catch (error) {
      return res
        .status(500)
        .json({ error: 'Ocoreu um erro interno', messages: error })
    }
  }

  async delete (req, res) {
    const { userCompanyProvider, userProvider, userCompanyId } = req

    if (!userProvider) {
      return res
        .status(401)
        .json({ error: 'Usuário não tem permissão para deletar as vendas' })
    }

    const { id } = req.params

    const sale = await Sale.findByPk(id)

    if (!sale) {
      return res.status(400).json({ error: 'Venda não encontrada' })
    }

    if (!userCompanyProvider && userCompanyId !== sale.company_id) {
      return res.status(401).json({
        error: 'Não é possivel excluir um registro de outra loja',
      })
    }

    await Sale.destroy({
      where: { id },
    })

    return res.json('ok')
  }
}

export default new SaleController()
