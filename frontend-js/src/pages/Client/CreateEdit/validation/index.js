import * as Yup from 'yup'

export default function validation () {
  const schema = Yup.object().shape({
    active: Yup.boolean(),
    name: Yup.string().required('O Nome é obrigatório'),
    email: Yup.string()
      .email('Insira um email válido')
      .required('O e-mail é obrigatório'),
    telefone: Yup.string(),
    whatsapp: Yup.string().required('O whatsapp é obrigatório'),
    company_id: Yup.number(), //.required('A loja é obrigatória'),
    cpf_cnpj: Yup.string(),
    cep: Yup.string().max(9, 'O máximo são 9 caracteres'),
    uf: Yup.string().max(2, 'O máximo são 2 caracteres'),
    city: Yup.string(),
    bairro: Yup.string(),
    logradouro: Yup.string()
  })

  return schema
}