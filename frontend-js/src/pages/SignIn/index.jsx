import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'

import logo from '../../assets/icone.png'
import { Form , Input} from '@rocketseat/unform'
import { signInRequest } from '../../store/modules/auth/actions'

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um email válido')
    .required('O e-mail é obigatório'),
  password: Yup.string().required('A senha é obigatória')
})

const SignIn = () => {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.auth.loading)

  const formRef = useRef(null)
  function handleSubmit ({ email, password }) {
    dispatch(signInRequest(email, password))
  }
  return (
    <>
      <img src={logo} alt='Gestão flex' />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name='email' type='email' placeholder='Seu e-mail' />
        <Input name='password' type='password' placeholder='Sua senha' />
        <button type='submit'>{loading ? 'Carregando ...' : 'Acessar'}</button>
        <Link to='/register'>Criar conta </Link>
      </Form>
    </>
  )
}

export default SignIn
