import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { Form, Input } from '@rocketseat/unform'

import { signInRequest } from '../../store/modules/auth/actions'
import SubmitButton from '../../components/SubmitButton'

import logo from '../../assets/logo_login.png'

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um email válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória')
})

const SignIn = () => {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.auth.loading)

  function handleSubmit ({ email, password }) {
    dispatch(signInRequest(email, password))
  }
  return (
    <>
      <img src={logo} alt='Gestão flex' />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name='email' type='email' placeholder='Seu e-mail' />
        <Input name='password' type='password' placeholder='Sua senha' />
        <SubmitButton loading={loading} text={'Acessar'} />
        <Link to='/register'>Criar conta </Link>
      </Form>
    </>
  )
}

export default SignIn
