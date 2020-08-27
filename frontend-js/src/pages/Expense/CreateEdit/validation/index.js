import * as Yup from 'yup'

export default function validation () {
  const schema = Yup.object().shape({
    description: Yup.string()
      .required('A descrição é obrigatória')
      .max(3000, 'Máximo 3000 caracteres'),
    value: Yup.string().required('O valor é obrigatório'),
    expense_type_id: Yup.string().required('O tipo é obrigatório')
  })

  return schema
}
