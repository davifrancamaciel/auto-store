import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      whatsapp: Yup.string().required(),
      telefone: Yup.string().optional(),
      cnpj: Yup.string().optional(),
      logradouro: Yup.string().optional(),
      cep: Yup.string().optional(),
      city: Yup.string().required(),
      uf: Yup.string()
        .max(2)
        .optional(),
      latitude: Yup.number().optional(),
      longitude: Yup.number().optional(),
      provider: Yup.boolean().required(),
      active: Yup.boolean().required(),
    });

    await schema.validate(req.body, {
      abortEarly: true,
    });
    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'A validação falhou', messages: err.inner });
  }
};
