import jwt from 'jsonwebtoken'

import Company from '../models/Company'
import User from '../models/User'
import authConfig from '../../config/auth'

class SessionController {
  async store (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({
      where: { email, provider: true },
      attributes: [
        'id',
        'company_id',
        'name',
        'email',
        'whatsapp',
        'provider',
        'active',
        'password_hash',
        'image',
      ],
      include: [
        {
          model: Company,
          as: 'company',
          attributes: ['id', 'active', 'provider', 'expires_at'],
        },
      ],
    })

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' })
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Senha invalida' })
    }

    const {
      id,
      company_id,
      name,
      image,
      provider,
      active,
      company,
      whatsapp,
    } = user

    if (!company.active) {
      return res.status(401).json({ error: 'Loja inativa' })
    }

    if (!company.provider && company.expires_at) {
      if (new Date(company.expires_at).getTime() < new Date().getTime()) {
        return res.status(401).json({
          error:
            'O tempo de utilização do sistema Gestão flex expirou. Entre em contato conosco e renove sua assinatura.',
        })
      }
    }

    if (!active) {
      return res.status(401).json({ error: 'Usuario inativo', user })
    }
    const company_provider = company.provider
    return res.json({
      user: {
        id,
        name,
        image,
        email,
        provider,
        company_id,
        company_provider,
        whatsapp,
      },
      token: jwt.sign(
        { id, provider, company_id, company_provider },
        authConfig.secret,
        {
          expiresIn: authConfig.expiresIn,
        }
      ),
    })
  }
}

export default new SessionController()
