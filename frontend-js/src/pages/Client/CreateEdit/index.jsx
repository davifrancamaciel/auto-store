import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Select, Check } from '@rocketseat/unform'
import { useSelector } from 'react-redux'

import Container from '../../../components/Container'
import SubmitButton from '../../../components/SubmitButton'
import FormContainer from '../../../components/FormContainer'
import Input from '../../../components/Input'
import InputMask from '../../../components/InputMask'
// import Adress from '../../../components/Adress'
import BackPage from '../../../components/BackPage'
import SelectR from '../../../components/Select'

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
  const [cepChanged, setCepChanged] = useState('')
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

  useEffect(() => {
    async function loadCep () {
      const response = await getLocale(cepChanged)
      console.log(response)
      setUser({
        ...user,
        ...response
      })
    }
    loadCep()
  }, [cepChanged])

  async function handleSubmit (data) {
    console.log(data)
    try {
      const saveUser = {
        ...data,
        id: id ? Number(id) : 0,
        provider: false
      }

      if (!saveUser.id)
        saveUser.password = process.env.REACT_APP_PASSWORD_DEFAULT

      if (!profile.company_provider) saveUser.company_id = profile.company_id

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
            <Input name='name' type='text' label='Nome' />

            <div className='field-group'>
              <Input name='email' type='email' label='Email' />
              <InputMask
                mask='999.999.999-99'
                name='cpf_cnpj'
                type='tel'
                label='CPF'
              />
            </div>
            <div className='field-group'>
              <InputMask
                mask='(99) 99999-9999'
                name='whatsapp'
                type='tel'
                label='Whatsapp'
              />
              <InputMask
                mask='(99) 99999-9999'
                name='telefone'
                type='tel'
                label='Telefone'
              />
            </div>
            <div className='field-group'>
              {profile.company_provider && (
                <div className='field'>
                  <Select label='Loja' name='company_id' options={companies} />
                </div>
              )}
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
              <InputMask
                mask='99999-999'
                label='Cep'
                name='cep'
                type='tel'
                onChangeCep={setCepChanged}
              />
              <Input name='uf' type='text' label='UF' />
              <Input name='city' type='text' label='Cidade' />
            </div>
            <div className='field-group'>
              <Input name='bairro' type='text' label='Bairro' />
              <Input name='logradouro' type='text' label='Logradouro' />
            </div>
          </fieldset>

          {/* <Adress /> */}

          <SubmitButton loading={loading ? true : false} text={'Salvar'} />
        </Form>
      </FormContainer>
    </Container>
  )
}

export default ClientCreateEdit
