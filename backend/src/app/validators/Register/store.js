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
      cpf_cnpj: Yup.string().optional(),
      logradouro: Yup.string().optional(),
      cep: Yup.string().optional(),
      city: Yup.string().optional(),
      uf: Yup.string()
        .max(2)
        .optional(),
      latitude: Yup.number().optional(),
      longitude: Yup.number().optional(),
      password: Yup.string()
        .min(6)
        .required(),
    });

    await schema.validate(req.body, {
      abortEarly: false,
    });
    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'A validação falhou', messages: err.inner });
  }
};
