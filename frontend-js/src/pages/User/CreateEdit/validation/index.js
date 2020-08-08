import * as Yup from 'yup'

export default function validation () {
    const schema = Yup.object().shape({
      active: Yup.boolean(),
      name: Yup.string().required('O Nome é obrigatório'),
      email: Yup.string()
        .email('Insira um email válido')
        .required('O e-mail é obrigatório'),
      whatsapp: Yup.string().required('O whatsapp é obrigatório'),
      company_id: Yup.number(), //.required('A loja é obrigatória'),      
    })
  
    return schema
  }
