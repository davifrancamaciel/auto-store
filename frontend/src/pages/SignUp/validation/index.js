import * as Yup from 'yup'

export default function validation () {
  const schema = Yup.object().shape({
    company_name: Yup.string()
      .required('O Nome da loja é obrigatório')
      .max(250, 'Máximo 250 caracteres'),
    name: Yup.string()
      .required('O Nome é obrigatório')
      .max(250, 'Máximo 250 caracteres'),
    email: Yup.string()
      .email('Insira um email válido')
      .required('O e-mail é obrigatório')
      .max(100, 'Máximo 100 caracteres'),
    whatsapp: Yup.string()
      .required('O whatsapp é obrigatório')
      .max(20, 'Máximo 20 caracteres'),
    password: Yup.string()
      .min(6, 'No minimo 6 carcteres')
      .required('A senha é obrigatória')
      .max(250, 'Máximo 250 caracteres')
  })

  return schema
}
