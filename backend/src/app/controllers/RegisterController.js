import Company from '../models/Company';
import User from '../models/User';

class RegisterController {
  async store(req, res) {
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
      name: req.body.name,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      whatsapp: req.body.whatsapp,
    });

    if (!company.id) {
      return res.status(400).json({ error: 'Oorreu um erro ao criar empresa' });
    }

    const newUser = {
      ...req.body,
      company_id: company.id,
      provider: true,
    };

    const { id, name, email, provider, whatsapp, city, uf } = await User.create(
      newUser
    );

    return res.json({ id, name, email, provider, whatsapp, city, uf });
  }
}

export default new RegisterController();
