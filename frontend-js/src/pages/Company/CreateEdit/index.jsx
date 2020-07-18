import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Form, Input } from '@rocketseat/unform'
import * as Yup from 'yup'
import { FiArrowLeft } from 'react-icons/fi'
import { toast } from 'react-toastify'

import Container from '../../../components/Container'
import SubmitButton from '../../../components/SubmitButton'
import FormContainer from '../../../components/FormContainer'

import api from '../../../services/api'
import history from '../../../services/browserhistory'
import getValidationErrors from '../../../Utils/getValidationErrors'
import getLocale from '../../../Utils/getLocale'

const schema = Yup.object().shape({
  name: Yup.string().required('O Nome é obigatório'),
  email: Yup.string()
    .email('Insira um email válido')
    .required('O e-mail é obigatório'),
  telefone: Yup.string(),
  whatsapp: Yup.string().required('O whatsapp é obigatório'),
  site: Yup.string(),
  cnpj: Yup.string(),
  cep: Yup.string()
    .max(9, 'O máximo são 9 caracteres')
    .matches(/[0-9]{5}-[\d]{3}/g, 'O cep esta em formato incorreto'),
  uf: Yup.string().max(2, 'O máximo são 2 caracteres'),
  city: Yup.string().required('A cidade é obigatória'),
  bairro: Yup.string().required('O bairro é obigatório'),
  logradouro: Yup.string()
})

const CompanyCreateEdit = props => {
  const { id } = useParams()

  const [loading, setLoading] = useState(false)
  const [company, setCompany] = useState({})
  const [cepChanged, setCepChanged] = useState('')

  useEffect(() => {
    if (id) {
      async function loadCompany (id) {
        try {
          setLoading(true)
          const response = await api.get(`companies/${id}`)

          setCompany(response.data)
          setLoading(false)
        } catch (error) {
          setLoading(false)
          getValidationErrors(error)
        }
      }
      loadCompany(id)
    }
  }, [])

  useEffect(() => {
    async function loadCep () {
      const response = await getLocale(cepChanged)
      console.log(response)
      setCompany({
        ...company,
        ...response
      })
    }
    loadCep()
  }, [cepChanged])

  async function handleSubmit (data) {
    try {
      const saveCompany = {
        ...data,
        id: id ? id : 0,
        provider: false,
        active: true
      }

      console.log(saveCompany)
      setLoading(true)

      if (id) {
        await api.put('companies', saveCompany)
      } else {
        await api.post('companies', saveCompany)
      }

      toast.success('Loja salva com sucesso!')

      setLoading(false)
      history.push('/company')
    } catch (error) {
      getValidationErrors(error)
      setLoading(false)
    }
  }
  return (
    <Container title='Cadastro de lojas'>
      <FormContainer loading={loading}>
        <Form schema={schema} onSubmit={handleSubmit} initialData={company}>
          <fieldset>
            <legend>
              <h2>Dados</h2>
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
            <div className='field'>
              <label htmlFor='name'>Nome</label>
              <Input name='name' type='text' />
            </div>
            <div className='field'>
              <label htmlFor='email'>Email</label>
              <Input name='email' type='email' />
            </div>
            <div className='field-group'>
              <div className='field'>
                <label htmlFor='telefone'>Telefone</label>
                <Input name='telefone' type='tel' />
              </div>
              <div className='field'>
                <label htmlFor='whatsapp'>Whatsapp</label>
                <Input name='whatsapp' type='tel' />
              </div>
            </div>
            <div className='field-group'>
              <div className='field'>
                <label htmlFor='site'>Site</label>
                <Input
                  name='site'
                  type='text'
                  placeholder='url do site da loja'
                />
              </div>
              <div className='field'>
                <label htmlFor='cnpj'>CNPJ</label>
                <Input name='cnpj' type='text' placeholder='' />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Endereço</h2>
            </legend>
            <div className='field-group'>
              <div className='field'>
                <label htmlFor='cep'>Cep</label>
                <Input
                  name='cep'
                  type='text'
                  onChange={e => setCepChanged(e.target.value)}
                />
              </div>
              <div className='field'>
                <label htmlFor='uf'>UF</label>
                <Input name='uf' type='text' />
              </div>
              <div className='field'>
                <label htmlFor='city'>Cidade</label>
                <Input name='city' type='text' />
              </div>
            </div>
            <div className='field-group'>
              <div className='field'>
                <label htmlFor='bairro'>Bairro</label>
                <Input name='bairro' type='text' />
              </div>

              <div className='field'>
                <label htmlFor='logradouro'>Logradouro</label>
                <Input name='logradouro' type='text' />
              </div>
            </div>
          </fieldset>

          <SubmitButton loading={loading} text={'Salvar'} />
        </Form>
      </FormContainer>
    </Container>
  )
}

export default CompanyCreateEdit
