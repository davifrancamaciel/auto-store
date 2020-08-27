import * as Yup from 'yup'

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      expense_type_id: Yup.number().required(),
      description: Yup.string()
        .required()
        .max(1000, 'Máximo 1000 caracteres'),
      value: Yup.number().required(),
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
