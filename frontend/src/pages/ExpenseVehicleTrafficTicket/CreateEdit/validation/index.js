import * as Yup from 'yup'

export default function validation () {
  const schema = Yup.object().shape({
    description: Yup.string()
      .required('O auto de infração é obrigatório')
      .max(15, 'Máximo 15 caracteres'),
    value: Yup.string().required('O valor é obrigatório'),    
  })

  return schema
}
