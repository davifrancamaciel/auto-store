import * as Yup from 'yup'

export default function validation () {
  const schema = Yup.object().shape({
    brand: Yup.string().max(50, 'Máximo 00 caracteres'),
    model: Yup.string()
      .required('O Modelo é obrigatório')
      .max(50, 'Máximo 50 caracteres'),
    type: Yup.string().max(50, 'Máximo 50 caracteres'),
    fuel: Yup.string().max(50, 'Máximo 50 caracteres'),
    year: Yup.string().optional(),
    year_model: Yup.string(),
    board: Yup.string()
      .required('A Placa é obrigatória')
      .max(10, 'Máximo 10 caracteres'),
    km: Yup.string().max(7, 'Máximo 7 caracteres'),
    value_purchase: Yup.string(),
    value_sale: Yup.string(),
    input_date: Yup.date(),
    description: Yup.string().max(250, 'Máximo 250 caracteres'),
    optional: Yup.string().max(250, 'Máximo 250 caracteres'),
    amount_oil: Yup.string(),
    receipt: Yup.boolean(),
    manual: Yup.boolean(),
    key_copy: Yup.boolean(),
    color: Yup.string().max(50, 'Máximo 50 caracteres'),
    renavan: Yup.string().max(20, 'Máximo 20 caracteres'),
    active: Yup.boolean()
  })

  return schema
}
