import * as Yup from 'yup'

export default function validation () {
  const schema = Yup.object().shape({
    description: Yup.string()
      .required('A descrição é obrigatória')
      .max(1000, 'Máximo 1000 caracteres'),
    value: Yup.string().required('O valor é obrigatório'),
    expense_type_id: Yup.string().required('O tipo é obrigatório')
  })

  return schema
}
