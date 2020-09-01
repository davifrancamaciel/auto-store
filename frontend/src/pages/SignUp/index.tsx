import React, { useRef } from 'react'
import { SubmitHandler, FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'

import Input from '../../components/Inputs/Input'
import logo from '../../assets/icone.png'
import api from '../../services/api'
import getValidationErrors from '../../Utils/getValidationErrors'
import FormData from './interfaces/ISignUpFormData'

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um email válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'No minimo 6 carcteres')
    .required('A senha é obrigatória')
})

const SignUp: React.FC = () => {
  let loading = false
  const formRef = useRef<FormHandles>(null)
  const handleSubmit: SubmitHandler<FormData> = async data => {
    try {
      await schema.validate(data, {
        abortEarly: false
      })
      console.log(formRef)
      console.log(data)
      const response = await api.post('sessions', data)
      console.log(response)
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        // Validation failed
        console.log(err)
        const errors = getValidationErrors(err)

        formRef.current?.setErrors(errors)

        return
      }
    }
  }
  return (
    <>
      <img src={logo} alt='Gestão flex' />
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name='name' type='text' placeholder='Nome completo' />
        <Input name='email' type='email' placeholder='Seu e-mail' />
        <Input name='password' type='password' placeholder='Sua senha' />
        <button type='submit'>
          {loading ? 'Criando conta ...' : 'Criar conta'}
        </button>
        <Link to='/'>Já tenho conta</Link>
      </Form>
    </>
  )
}

export default SignUp;