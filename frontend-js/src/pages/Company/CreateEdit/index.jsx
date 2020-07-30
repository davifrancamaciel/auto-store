import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'

import { Form, Check } from '@rocketseat/unform'

import * as Yup from 'yup'
import { FiArrowLeft } from 'react-icons/fi'

import Container from '../../../components/Container'
import SubmitButton from '../../../components/SubmitButton'
import FormContainer from '../../../components/FormContainer'
import Dropzone from '../../../components/Dropzone'
import Input from '../../../components/Input'
// import InputMaskPhone from '../../../components/InputMaskPhone'
import InputMask from '../../../components/InputMask'

import api from '../../../services/api'
import history from '../../../services/browserhistory'
import getValidationErrors from '../../../Utils/getValidationErrors'
import showToast from '../../../Utils/showToast'
import getLocale from '../../../Utils/getLocale'
import getImage from '../../../Utils/getImage'

const schema = Yup.object().shape({
  active: Yup.boolean(),
  name: Yup.string().required('O Nome é obigatório'),
  responsavel: Yup.string(),
  email: Yup.string()
    .email('Insira um email válido')
    .required('O e-mail é obigatório'),
  telefone: Yup.string(),
  whatsapp: Yup.string().required('O whatsapp é obigatório'),
  site: Yup.string(),
  cnpj: Yup.string(),
  cep: Yup.string().max(9, 'O máximo são 9 caracteres'),
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
  const [selectedImage, setSelectedImage] = useState()

  useEffect(() => {
    if (id) {
      async function loadCompany (id) {
        try {
          setLoading(true)
          const response = await api.get(`companies/${id}`)

          setCompany({
            ...response.data,
            image: response.data.image
              ? getImage(response.data.image, response.data.name)
              : null
          })
          setLoading(false)
        } catch (error) {
          setLoading(false)
          getValidationErrors(error)
        }
      }
      loadCompany(id)
    } else {
      setCompany({
        ...company,
        active: true
      })
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
        image: selectedImage
      }

      let formData = new FormData()

      formData.append('name', saveCompany.name)
      formData.append('email', saveCompany.email)
      formData.append('responsavel', saveCompany.responsavel)
      formData.append('telefone', saveCompany.telefone)
      formData.append('whatsapp', saveCompany.whatsapp)
      formData.append('site', saveCompany.site)
      formData.append('cnpj', saveCompany.cnpj)
      formData.append('cep', saveCompany.cep)
      formData.append('uf', saveCompany.uf)
      formData.append('city', saveCompany.city)
      formData.append('bairro', saveCompany.bairro)
      formData.append('logradouro', saveCompany.logradouro)
      formData.append('provider', saveCompany.provider)
      formData.append('active', saveCompany.active)
      if (saveCompany.id) {
        formData.append('id', saveCompany.id)
      }
      if (selectedImage) {
        formData.append('file', selectedImage)
      }

      setLoading(true)

      if (saveCompany.id) {
        await api.put('companies', formData)
      } else {
        await api.post('companies', formData)
      }

      showToast.success('Loja salva com sucesso!')

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
              <h2>Logo da loja</h2>
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
            <Dropzone
              onFileSelectedUpload={setSelectedImage}
              image={company.image}
            />
          </fieldset>

          <fieldset>
            <legend>
              <h2>Dados</h2>
            </legend>
            <Input name='name' type='text' label='Nome' />
            <Input
              name='responsavel'
              type='text'
              label='Resposável'
              placeholder='Responsáveis pela loja ex. Walter/Tiago'
            />
            <Input name='email' type='email' label='Email' />
            <div className='field-group'>
              {/* <InputMaskPhone                
                name='telefone'
                label='Telefone'
              /> */}
              <InputMask
                mask='(99) 99999-9999'
                name='telefone'
                type='tel'
                label='Telefone'
              />
              <InputMask
                mask='(99) 99999-9999'
                name='whatsapp'
                type='tel'
                label='Whatsapp'
              />
            </div>
            <div className='field-group'>
              <Input
                label='Site'
                name='site'
                type='text'
                placeholder='url do site da loja'
              />
              <InputMask
                mask='99.999.999/9999-9'
                name='cnpj'
                type='tel'
                label='CNPJ'
              />
            </div>
            <div className='field'>
              <label className='alt-check'>
                <Check name='active' />
                <span>Loja ativa</span>
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

          <SubmitButton loading={loading ? true : false} text={'Salvar'} />
        </Form>
      </FormContainer>
    </Container>
  )
}

export default CompanyCreateEdit