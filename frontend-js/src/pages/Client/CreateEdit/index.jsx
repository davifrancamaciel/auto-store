import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Check } from '@rocketseat/unform'
import { useSelector } from 'react-redux'
import { parseISO } from 'date-fns'

import Container from '../../../components/_layouts/Container'
import SubmitButton from '../../../components/SubmitButton'
import FormContainer from '../../../components/_layouts/FormContainer'
import Input from '../../../components/Inputs/Input'
import Datepicker from '../../../components/Inputs/Datepicker'
import InputMask from '../../../components/Inputs/InputMask'
import BackPage from '../../../components/BackPage'

import getLocale from '../../../Utils/getLocale'
import showToast from '../../../Utils/showToast'
import api from '../../../services/api'
import history from '../../../services/browserhistory'
import getValidationErrors from '../../../Utils/getValidationErrors'
import validation from './validation'

const ClientCreateEdit = () => {
  const { id } = useParams()
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)
  const [zipCodeChanged, setZipCodeChanged] = useState('')
  const [birthDate, setBirthDate] = useState()

  const profile = useSelector(state => state.user.profile)

  useEffect(() => {
    if (profile.company_provider) {
      history.push('/dashboard')
      showToast.error('Usuário sem permissão para acessar lista de clientes.')
      return
    }

    if (id) {
      async function loadUser (id) {
        try {
          setLoading(true)
          const response = await api.get(`users/${id}`)

          setUser(response.data)
          setLoading(false)
          if (response.data.birth_date) {
            setBirthDate(parseISO(response.data.birth_date))
          }
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

  useEffect(() => {
    async function loadZipCode () {
      const response = await getLocale(zipCodeChanged)
      console.log(response)
      setUser({
        ...user,
        ...response
      })
    }
    loadZipCode()
  }, [zipCodeChanged])

  async function handleSubmit (data) {
    try {
      const saveUser = {
        ...data,
        id: id ? Number(id) : 0,
        provider: false,
        company_id: profile.company_id
      }

      if (!saveUser.id)
        saveUser.password = process.env.REACT_APP_PASSWORD_DEFAULT

      setLoading(true)

      if (saveUser.id) {
        await api.put('users', saveUser)
      } else {
        await api.post('users', saveUser)
      }

      showToast.success(`Cliente salvo com sucesso!`)

      setLoading(false)
      history.push(`/client`)
    } catch (error) {
      getValidationErrors(error)
      setLoading(false)
    }
  }

  return (
    <Container title={`Cadastro de clientes`}>
      <FormContainer loading={loading}>
        <Form onSubmit={handleSubmit} initialData={user} schema={validation()}>
          <fieldset>
            <legend>
              <h2>Dados</h2>
              <BackPage />
            </legend>
            <div className='field'>
              <Input name='name' type='text' label='Nome' />
            </div>

            <div className='field-group'>
              <div className='field'>
                <Input name='email' type='email' label='Email' />
              </div>
              <div className='field'>
                <Input name='profession' type='text' label='Profissão' />
              </div>
              
            </div>
            <div className='field-group'>
              <div className='field'>
                <InputMask
                  mask='999.999.999-99'
                  name='cpf_cnpj'
                  type='tel'
                  label='CPF'
                />
              </div>

              <div className='field'>
                <InputMask
                  mask='99999999999'
                  name='cnh'
                  type='tel'
                  label='CNH'
                />
              </div>
              <div className='field'>
                <InputMask
                  mask='99.999.999-9'
                  name='rg'
                  type='tel'
                  label='RG'
                />
              </div>
            </div>
            <div className='field-group'>
              <div className='field'>
                <InputMask
                  mask='(99) 99999-9999'
                  name='whatsapp'
                  type='tel'
                  label='Whatsapp'
                />
              </div>
              <div className='field'>
                <InputMask
                  mask='(99) 99999-9999'
                  name='phone'
                  type='tel'
                  label='Telefone'
                />
              </div>
              <div className='field'>
                <Datepicker
                  name='birth_date'
                  label='Data de nascimento'
                  selected={birthDate}
                  onChange={setBirthDate}
                />
              </div>
            </div>
            <div className='field'>
              <label className='alt-check'>
                <Check name='active' />
                <span>Ativo</span>
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Endereço</h2>
            </legend>
            <div className='field-group'>
              <div className='field'>
                <InputMask
                  mask='99999-999'
                  label='Cep'
                  name='zip_code'
                  type='tel'
                  onChangezip_code={setZipCodeChanged}
                />
              </div>
              <div className='field'>
                <Input name='state' type='text' label='UF' />
              </div>
              <div className='field'>
                <Input name='city' type='text' label='Cidade' />
              </div>
            </div>
            <div className='field-group'>
              <div className='field'>
                <Input name='neighborhood' type='text' label='Bairro' />
              </div>
              <div className='field'>
                <Input name='street' type='text' label='Logradouro' />
              </div>
            </div>
            <div className='field'>
              <Input
                name='complement'
                type='text'
                label='Complemento'
                placeholder='Ex.: Nº 0000, fundos etc...'
              />
            </div>
          </fieldset>

          <SubmitButton loading={loading ? true : false} text={'Salvar'} />
        </Form>
      </FormContainer>
    </Container>
  )
}

export default ClientCreateEdit
