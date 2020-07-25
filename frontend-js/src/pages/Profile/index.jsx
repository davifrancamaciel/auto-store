import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form } from '@rocketseat/unform'
import { FiArrowLeft } from 'react-icons/fi'

import { signOut } from '../../store/modules/auth/actions'
import { updateProfileRequest } from '../../store/modules/user/actions'
import AvatarInput from './AvatarInput'

import Container from '../../components/Container'
import SubmitButton from '../../components/SubmitButton'
import FormContainer from '../../components/FormContainer'
import Input from '../../components/Input'

import history from '../../services/browserhistory'

function Profile () {
  const dispatch = useDispatch()
  const profile = useSelector(state => state.user.profile)
  const loading = useSelector(state => state.user.loading)

  function handleSubmit (data) {
    dispatch(updateProfileRequest(data))
  }

  function handleSignOut () {
    dispatch(signOut())
  }
  return (
    <Container title='Minha conta'>
      <FormContainer loading={loading}>
        <Form initialData={profile} onSubmit={handleSubmit}>
          <fieldset>
            <legend>
              <h2></h2>
              <span>
                <span
                  onClick={() => {
                    history.goBack()
                  }}
                >
                  <FiArrowLeft />
                  Voltar
                </span>
              </span>
            </legend>
            <AvatarInput name='avatar_id' />
          </fieldset>

          <fieldset>
            <legend>
              <h2>Dados</h2>
            </legend>

            <Input name='name' label='Nome' />
            <Input name='email' type='email' label='Email' />
          </fieldset>
          <fieldset>
            <legend>
              <h2>Credenciais</h2>
            </legend>

            <Input type='password' name='oldPassword' label='Sua senha atual' />
            <Input type='password' name='password' label='Nova senha' />
            <Input
              type='password'
              name='confirmPassword'
              label='Confirme a nova senha'
            />
          </fieldset>

          <SubmitButton
            loading={loading ? true : false}
            text={'Atualizar perfil'}
          />

          {/* <button onClick={handleSignOut} type='button'>
            Sair
          </button> */}
        </Form>
      </FormContainer>
    </Container>
  )
}

export default Profile
