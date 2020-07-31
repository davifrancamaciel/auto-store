import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { Form, Input } from '@rocketseat/unform'

import { signUpRequest } from '../../store/modules/auth/actions'
import SubmitButton from '../../components/SubmitButton'

import logo from '../../assets/icone.png'

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  whatsapp: Yup.string().required('O whatsapp é obrigatório'),
  email: Yup.string()
    .email('Insira um email válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'No minimo 6 carcteres')
    .required('A senha é obrigatória')
})

const SignUp = () => {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.auth.loading)

  function handleSubmit ({ name, email, password, whatsapp }) {
    dispatch(signUpRequest(name, email, password, whatsapp))
  }

  return (
    <>
      <img src={logo} alt='Gestão flex' />
      <span>GESTÃO FLEX</span>
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name='name' type='text' placeholder='Nome completo' />
        <Input
          name='whatsapp'
          type='text'
          placeholder='Seu whatsapp ou da loja'
        />
        <Input name='email' type='email' placeholder='Seu e-mail' />
        <Input name='password' type='password' placeholder='Sua senha' />
        <SubmitButton loading={loading} text={'Criar conta'} />
        <Link to='/'>Já tenho conta</Link>
      </Form>
    </>
  )
}

export default SignUp
