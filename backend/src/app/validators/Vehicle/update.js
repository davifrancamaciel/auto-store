import * as Yup from 'yup'

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      brand: Yup.string()
        .optional()
        .max(50, 'Máximo 50 caracteres'),
      model: Yup.string()
        .required()
        .max(50, 'Máximo 50 caracteres'),
      type: Yup.string()
        .optional()
        .max(50, 'Máximo 50 caracteres'),
      fuel: Yup.string()
        .optional()
        .max(50, 'Máximo 50 caracteres'),
      year: Yup.string().optional(),
      year_model: Yup.string().optional(),
      board: Yup.string()
        .required('A Placa é obrigatória')
        .max(10, 'Máximo 10 caracteres'),
      km: Yup.string().optional(),
      input_date: Yup.date().optional(),
      description: Yup.string().optional(),
      receipt: Yup.boolean().optional(),
      manual: Yup.boolean().optional(),
      key_copy: Yup.boolean().optional(),
      amount_oil: Yup.string().optional(),
      optional: Yup.string()
        .optional()
        .max(250, 'Máximo 250 caracteres'),
      value_sale: Yup.string().optional(),
      value_purchase: Yup.string().optional(),
      renavam: Yup.string()
        .optional()
        .max(20, 'Máximo 20 caracteres'),
      color: Yup.string()
        .optional()
        .max(50, 'Máximo 50 caracteres'),
      active: Yup.boolean().optional(),
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
