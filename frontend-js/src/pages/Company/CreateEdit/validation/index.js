import * as Yup from 'yup'

export default function validation () {
  const schema = Yup.object().shape({
    active: Yup.boolean(),
    name: Yup.string()
      .required('O Nome é obrigatório')
      .max(250, 'Máximo 250 caracteres'),
    responsible: Yup.string().max(250, 'Máximo 250 caracteres'),
    email: Yup.string()
      .email('Insira um email válido')
      .required('O email é obrigatório')
      .max(100, 'Máximo 100 caracteres'),
    phone: Yup.string().max(20, 'Máximo 20 caracteres'),
    whatsapp: Yup.string()
      .required('O whatsapp é obrigatório')
      .max(20, 'Máximo 20 caracteres'),
    site: Yup.string().max(100, 'Máximo 100 caracteres'),
    cnpj: Yup.string().max(20, 'Máximo 20 caracteres'),
    zip_code: Yup.string().max(9, 'O máximo são 9 caracteres'),
    state: Yup.string().max(2, 'O máximo são 2 caracteres'),
    city: Yup.string()
      .required('A cidade é obrigatória')
      .max(100, 'Máximo 100 caracteres'),
    neighborhood: Yup.string()
      .required('O bairro é obrigatório')
      .max(100, 'Máximo 100 caracteres'),
    street: Yup.string().max(250, 'Máximo 250 caracteres'),
    complement: Yup.string().max(100, 'Máximo 100 caracteres'),
    expires_at: Yup.date()
      .optional()
      .typeError('A data de expiração é obrigatória')
  })

  return schema
}
