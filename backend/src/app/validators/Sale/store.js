import * as Yup from 'yup'

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      vehicle_id: Yup.number().required(),
      user_id: Yup.number().required(),
      next_exchange_oil: Yup.string()
        .optional()
        .max(20, 'Máximo 20 caracteres'),
      financed_value: Yup.string().optional(),
      financed_value_description: Yup.string()
        .optional()
        .max(20, 'Máximo 20 caracteres'),
      financed_value_financial: Yup.string().optional(),
      input_value: Yup.string().optional(),
      input_value_description: Yup.string()
        .optional()
        .max(50, 'Máximo 50 caracteres'),
      vehicle_input_value: Yup.string().optional(),

      vehicle_input_value_description: Yup.string()
        .optional()
        .max(50, 'Máximo 50 caracteres'),
      sale_date: Yup.string().optional(),
      origin: Yup.string()
        .optional()
        .max(50, 'Máximo 50 caracteres'),
      last_crlv: Yup.string()
        .optional()
        .max(4, 'Máximo 4 caracteres'),
      paid_out_ipva: Yup.string()
        .optional()
        .max(4, 'Máximo 4 caracteres'),
      delivered_receipt: Yup.boolean(),
      checklist_delivery: Yup.boolean(),
      checklist_auto: Yup.boolean(),
      alienation_low: Yup.boolean(),
      report_take_care: Yup.boolean(),
      report_precautionary: Yup.boolean(),
      there_anything: Yup.boolean(),
      discounted_sale_value: Yup.boolean(),
      not_discounted_sale_value: Yup.boolean(),
      additional_note: Yup.string()
        .optional()
        .max(1000, 'Máximo 1000 caracteres'),
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
