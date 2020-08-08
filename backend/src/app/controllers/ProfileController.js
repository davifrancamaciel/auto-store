import { Op } from 'sequelize'

import Company from '../models/Company'
import User from '../models/User'
import removeFile from '../utils/removeFile'

class ProfileController {

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

    const { id, name, provider, company_id, whatsapp } = await User.findByPk(
      req.userId
    )

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

export default new ProfileController()
