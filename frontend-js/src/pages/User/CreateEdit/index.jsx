import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Check } from '@rocketseat/unform'
import { useSelector } from 'react-redux'

import Container from '../../../components/_layouts/Container'
import SubmitButton from '../../../components/SubmitButton'
import FormContainer from '../../../components/_layouts/FormContainer'
import Input from '../../../components/Inputs/Input'
import InputMask from '../../../components/Inputs/InputMask'
import BackPage from '../../../components/BackPage'
import Select from '../../../components/Inputs/Select'

import showToast from '../../../Utils/showToast'
import api from '../../../services/api'
import history from '../../../services/browserhistory'
import getValidationErrors from '../../../Utils/getValidationErrors'
import validation from './validation'

const UserCreateEdit = () => {
  const { id } = useParams()
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)
  const [companies, setCompanies] = useState([])
  const profile = useSelector(state => state.user.profile)

  useEffect(() => {
    async function loadCompanies () {
      try {
        const response = await api.get('companies/list')
        setCompanies(response.data)
      } catch (error) {
        getValidationErrors(error)
      }
    }

    if (profile.company_provider) loadCompanies()

    if (id) {
      async function loadUser (id) {
        try {
          setLoading(true)
          const response = await api.get(`users/${id}`)

          setUser(response.data)
          setLoading(false)
        } catch (error) {
          setLoading(false)
          getValidationErrors(error)
        }
      }
      loadUser(id)
    } else {
      setUser({
        ...user,
        active: true
      })
    }
  }, [])

  async function handleSubmit (data) {
    console.log(data)
    try {
      const saveUser = {
        ...data,
        id: id ? Number(id) : 0,
        provider: true
      }

      if (!saveUser.id)
        saveUser.password = process.env.REACT_APP_PASSWORD_DEFAULT

      if (saveUser.reset)
        saveUser.password = process.env.REACT_APP_PASSWORD_DEFAULT

      if (!profile.company_provider) saveUser.company_id = profile.company_id

      setLoading(true)

      if (saveUser.id) {
        await api.put('users', saveUser)
      } else {
        await api.post('users', saveUser)
      }

      showToast.success(`Usuário salvo com sucesso!`)

      setLoading(false)
      history.push(`/user`)
    } catch (error) {
      getValidationErrors(error)
      setLoading(false)
    }
  }

  return (
    <Container title={`Cadastro de usuários do sistema`}>
      <FormContainer loading={loading}>
        <Form
          onSubmit={handleSubmit}
          initialData={user}
          schema={validation(profile.company_provider)}
        >
          <fieldset>
            <legend>
              <h2>Dados</h2>
              <BackPage />
            </legend>
            <Input name='name' type='text' label='Nome' />

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
            {profile.company_provider && (
              <div className='field'>
                <Select
                  label='Loja'
                  name='company_id'
                  options={companies}
                  defaultValue={user.company_id}
                />
              </div>
            )}

            <div className='field-group'>
              <div className='field'>
                <label className='alt-check'>
                  <Check name='active' />
                  <span>Ativo</span>
                </label>
              </div>
              <div className='field'>
                <label className='alt-check'>
                  <Check name='reset' />
                  <span>
                    Restaurar senha para{' '}
                    {process.env.REACT_APP_PASSWORD_DEFAULT}
                  </span>
                </label>
              </div>
            </div>
          </fieldset>

          <SubmitButton loading={loading ? true : false} text={'Salvar'} />
        </Form>
      </FormContainer>
    </Container>
  )
}

export default UserCreateEdit
