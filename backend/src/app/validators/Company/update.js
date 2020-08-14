import * as Yup from 'yup'


export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      name: Yup.string().required().max(250,'Máximo 250 caracteres'),
      responsavel: Yup.string().optional().max(250,'Máximo 250 caracteres'),
      email: Yup.string()
        .email()
        .required().max(100,'Máximo 100 caracteres'),
      whatsapp: Yup.string().required().max(20,'Máximo 20 caracteres'),
      telefone: Yup.string().optional().max(20,'Máximo 20 caracteres'),
      cnpj: Yup.string().optional().max(20,'Máximo 20 caracteres'),
      logradouro: Yup.string().optional().max(250,'Máximo 250 caracteres'),
      cep: Yup.string().optional().max(20,'Máximo 20 caracteres'),
      city: Yup.string().required().max(100,'Máximo 100 caracteres'),
      uf: Yup.string()
        .max(2,'Máximo 2 caracteres')
        .optional(),
      latitude: Yup.number().optional(),
      longitude: Yup.number().optional(),
      provider: Yup.boolean().required(),
      active: Yup.boolean().required(),
    })

    await schema.validate(req.body, {
      abortEarly: false,
    })
    return next()
  } catch (err) {

    return res
      .status(400)
      .json({ error: 'A validação falhou', messages: err.inner })
  }
}
