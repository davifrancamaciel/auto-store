import * as Yup from 'yup'

export default function validation (provider) {
  const schema = Yup.object().shape({
    active: Yup.boolean().optional(),
    reset: Yup.boolean().optional(),
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
    company_id: provider
      ? Yup.string().required('A loja é obrigatória')
      : Yup.string().optional()
  })

  return schema
}
