import Company from '../models/Company';
import User from '../models/User';
import getExpireDate from '../utils/addDays';

class RegisterController {
  async store(req, res) {
    try {
      const userExist = await User.findOne({
        where: { email: req.body.email },
      });

      if (userExist) {
        return res
          .status(400)
          .json({ error: 'Já existe um usuário com este email' });
      }

      const company = await Company.create({
        provider: false,
        name: req.body.company_name,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        whatsapp: req.body.whatsapp,
        expires_at: getExpireDate(process.env.DAYS_EXPIRES),
      });

      if (!company.id) {
        return res
          .status(400)
          .json({ error: 'Oorreu um erro ao criar a loja' });
      }

      const newUser = {
        ...req.body,
        company_id: company.id,
        provider: true,
      };

      const {
        id,
        name,
        email,
        provider,
        whatsapp,
        city,
        state,
      } = await User.create(newUser);

      return res.json({ id, name, email, provider, whatsapp, city, state });
    } catch (error) {
      return res
        .status(500)
        .json({ error: 'Ocoreu um erro interno', messages: error });
    }
  }
}

export default new RegisterController();
