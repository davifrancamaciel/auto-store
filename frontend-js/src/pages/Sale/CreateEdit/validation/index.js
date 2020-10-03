import * as Yup from 'yup'

export default function validation () {
  const schema = Yup.object().shape({
    vehicle_id: Yup.string().required('O veículo é obrigatório'),
    user_id: Yup.string().required('O cliente é obrigatório'),
    next_exchange_oil: Yup.string().optional(),
    financed_value: Yup.string().optional(),
    financed_value_description: Yup.string().optional(),
    financed_value_financial: Yup.string().optional(),
    input_value: Yup.string().optional(),
    input_value_description: Yup.string().optional(),
    vehicle_input_value: Yup.string().optional(),
    vehicle_input_value_description: Yup.string().optional(),
    sale_date: Yup.date()
      .required('A data é obrigatória')
      .typeError('A data é obrigatória'),
    origin: Yup.string().optional(),
    last_crlv: Yup.string().optional(),
    paid_out_ipva: Yup.string().optional(),
    delivered_receipt: Yup.string().optional(),
    checklist_delivery: Yup.string().optional(),
    checklist_auto: Yup.string().optional(),
    alienation_low: Yup.string().optional(),
    report_take_care: Yup.string().optional(),
    report_precautionary: Yup.string().optional(),
    there_anything: Yup.string().optional(),
    discounted_sale_value: Yup.string().optional(),
    not_discounted_sale_value: Yup.string().optional(),
    additional_note: Yup.string()
      .optional()
      .max(1000, 'Máximo 1000 caracteres')
  })

  return schema
}
