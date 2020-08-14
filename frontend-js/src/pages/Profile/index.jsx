import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form } from '@rocketseat/unform'
import * as Yup from 'yup'

import { signOut } from '../../store/modules/auth/actions'
import { updateProfileRequest } from '../../store/modules/user/actions'

import Container from '../../components/Container'
import SubmitButton from '../../components/SubmitButton'
import FormContainer from '../../components/FormContainer'
import Input from '../../components/Input'
import InputMask from '../../components/InputMask'
import Dropzone from '../../components/Dropzone'
import BackPage from '../../components/BackPage'

import getImage from '../../Utils/getImage'
import showToast from '../../Utils/showToast'

import { ProfileContainer, LogoutButton } from './styles'

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  whatsapp: Yup.string().required('O whatsapp é obrigatório'),
  email: Yup.string()
    .email('Insira um email válido')
    .required('O e-mail é obrigatório'),
  oldPassword: Yup.string(),
  password: Yup.string(),
  confirmPassword: Yup.string()
})

function Profile () {
  const [selectedImage, setSelectedImage] = useState()
  const dispatch = useDispatch()
  const profile = useSelector(state => state.user.profile)
  const profileFormated = {
    ...profile,
    image: profile.image ? getImage(profile.image, profile.name) : null
  }
  const loading = useSelector(state => state.user.loading)

  function handleSubmit (data) {
    const user = {
      ...data,
      company_id: profile.company_id,
      image: selectedImage
    }
    if (data.oldPassword && (!data.password || !data.confirmPassword)) {
      showToast.error(
        'Para alterar a sua senha preencha também os campos de nova senha e confirmação'
      )
      return
    }
    if (data.password && data.password !== data.confirmPassword) {
      showToast.error('As senhas informadas estão diferentes')
      return
    }

    dispatch(updateProfileRequest(user))
  }

  function handleSignOut () {
    dispatch(signOut())
  }
  return (
    <Container title='Minha conta'>
      <FormContainer loading={loading}>
        <ProfileContainer>
          <Form
            schema={schema}
            initialData={profileFormated}
            onSubmit={handleSubmit}
          >
            <fieldset>
              <legend>
                <h2></h2>
                <BackPage />
              </legend>

              <Dropzone
                onFileSelectedUpload={setSelectedImage}
                image={profileFormated.image}
              />
            </fieldset>

            <fieldset>
              <legend>
                <h2>Dados</h2>
              </legend>
              <Input name='name' label='Nome' />
              <div className='field-group'>
                <Input name='email' type='email' label='Email' />
                <div className='field'>
                  <InputMask
                    mask='(99) 99999-9999'
                    name='whatsapp'
                    type='tel'
                    label='Whatsapp'
                  />
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend>
                <h2>Credenciais</h2>
              </legend>
              <div className='field-group'>
                <Input
                  type='password'
                  name='oldPassword'
                  label='Sua senha atual'
                />
                <Input type='password' name='password' label='Nova senha' />
                <Input
                  type='password'
                  name='confirmPassword'
                  label='Confirme a nova senha'
                />
              </div>
            </fieldset>
            <fieldset>
              <div className='field-group'>
                <div className='field'>
                  <LogoutButton onClick={handleSignOut} type='button'>
                    Sair
                  </LogoutButton>
                </div>
                <div className='field'>
                  <SubmitButton
                    loading={loading ? true : false}
                    text={'Atualizar perfil'}
                  />
                </div>
              </div>
            </fieldset>
          </Form>
        </ProfileContainer>
      </FormContainer>
    </Container>
  )
}

export default Profile
