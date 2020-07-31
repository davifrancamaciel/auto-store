import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SubmitHandler, FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'

import Input from '../../components/Input'
import logo from '../../assets/icone.png'
import api from '../../services/api'
import getValidationErrors from '../../Utils/getValidationErrors'
import FormData from './interfaces/ISignInFormData'
import { signInRequest } from '../../store/modules/auth/actions'

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um email válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória')
})

const SignIn: React.FC = () => {
  const dispatch = useDispatch()
  const loading = useSelector<any>(state => state.auth.loading)

  const formRef = useRef<FormHandles>(null)
  const handleSubmit: SubmitHandler<FormData> = async data => {
    try {
      await schema.validate(data, {
        abortEarly: false
      })
      
      dispatch(signInRequest(data.email, data.password))
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
        <Input name='email' type='email' placeholder='Seu e-mail' />
        <Input name='password' type='password' placeholder='Sua senha' />
        <button type='submit'>{loading ? 'Carregando ...' : 'Acessar'}</button>
        <Link to='/register'>Criar conta </Link>
      </Form>
    </>
  )
}

export default SignIn
