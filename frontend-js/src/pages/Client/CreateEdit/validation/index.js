import * as Yup from 'yup'

export default function validation () {
  const schema = Yup.object().shape({
    active: Yup.boolean(),
    name: Yup.string()
      .required('O Nome é obrigatório')
      .max(250, 'Máximo 250 caracteres'),
    email: Yup.string()
      .email('Insira um email válido')
      .required('O e-mail é obrigatório')
      .max(100, 'Máximo 100 caracteres'),
    telefone: Yup.string().max(20, 'Máximo 20 caracteres'),
    whatsapp: Yup.string()
      .required('O whatsapp é obrigatório')
      .max(20, 'Máximo 20 caracteres'),
    company_id: Yup.number('A loja é obrigatória'), //.required('A loja é obrigatória'),
    cpf_cnpj: Yup.string().max(20, 'Máximo 20 caracteres'),
    cep: Yup.string().max(9, 'O máximo são 9 caracteres'),
    uf: Yup.string().max(2, 'O máximo são 2 caracteres'),
    city: Yup.string().max(100, 'Máximo 100 caracteres'),
    bairro: Yup.string().max(100, 'Máximo 100 caracteres'),
    logradouro: Yup.string().max(250, 'Máximo 250 caracteres'),
    complement: Yup.string().max(100, 'Máximo 100 caracteres'),
  })

  return schema
}
