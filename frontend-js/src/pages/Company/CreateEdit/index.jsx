import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { parseISO } from 'date-fns'

import { Form, Check } from '@rocketseat/unform'

import Container from '../../../components/Container'
import SubmitButton from '../../../components/SubmitButton'
import FormContainer from '../../../components/FormContainer'
import Dropzone from '../../../components/Dropzone'
import Input from '../../../components/Input'
import Datepicker from '../../../components/Datepicker'
// import InputMaskPhone from '../../../components/InputMaskPhone'
import InputMask from '../../../components/InputMask'
import BackPage from '../../../components/BackPage'

import api from '../../../services/api'
import history from '../../../services/browserhistory'
import getValidationErrors from '../../../Utils/getValidationErrors'
import showToast from '../../../Utils/showToast'
import getLocale from '../../../Utils/getLocale'
import getImage from '../../../Utils/getImage'
import addDays from '../../../Utils/addDays'
import validation from './validation'

const CompanyCreateEdit = props => {
  const { id } = useParams()
  const profile = useSelector(state => state.user.profile)

  const [companyId, setCompanyId] = useState(id || 0)
  const [loading, setLoading] = useState(false)
  const [company, setCompany] = useState({})
  const [zipCodeChanged, setZipCodeChanged] = useState('')
  const [selectedImage, setSelectedImage] = useState()
  const [expireDate, setExpireDate] = useState()

  const handleChange = date => {
    console.log(date)
    setExpireDate(date)
  }

  useEffect(() => {
    if (!profile.company_provider) {
      setCompanyId(profile.company_id)
    }

    if (companyId) {
      async function loadCompany (id) {
        try {
          setLoading(true)
          const response = await api.get(`companies/${id}`)

          setCompany({
            ...response.data,
            expires_at: parseISO(response.data.expires_at),
            image: response.data.image
              ? getImage(response.data.image, response.data.name)
              : null
          })
          setExpireDate(parseISO(response.data.expires_at))

          setLoading(false)
        } catch (error) {
          setLoading(false)
          getValidationErrors(error)
        }
      }
      loadCompany(companyId)
    } else {
      setCompany({
        ...company,
        active: true
      })
      setExpireDate(addDays(process.env.REACT_APP_DAYS_EXPIRES))
    }
  }, [companyId])

  useEffect(() => {
    async function loadzip_code () {
      const response = await getLocale(zipCodeChanged)

      setCompany({
        ...company,
        ...response
      })
    }
    loadzip_code()
  }, [zipCodeChanged])

  async function handleSubmit (data) {
    try {
      const saveCompany = {
        ...data,
        id: companyId,
        provider: false,
        image: selectedImage
      }
      console.log(saveCompany)
      let formData = new FormData()

      formData.append('name', saveCompany.name)
      formData.append('email', saveCompany.email)
      formData.append('responsible', saveCompany.responsible)
      formData.append('phone', saveCompany.phone)
      formData.append('whatsapp', saveCompany.whatsapp)
      formData.append('site', saveCompany.site)
      formData.append('cnpj', saveCompany.cnpj)
      formData.append('zip_code', saveCompany.zip_code)
      formData.append('uf', saveCompany.uf)
      formData.append('city', saveCompany.city)
      formData.append('district', saveCompany.district)
      formData.append('street', saveCompany.street)
      formData.append('provider', saveCompany.provider)
      formData.append('complement', saveCompany.complement)

      if (profile.company_provider) {
        formData.append('active', saveCompany.active)
        formData.append('expires_at', saveCompany.expires_at)
      }

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
      if (profile.company_provider) {
        history.push('/company')
      } else {
        history.push('/dashboard')
      }
    } catch (error) {
      getValidationErrors(error)
      setLoading(false)
    }
  }

  return (
    <Container
      title={profile.company_provider ? 'Cadastro de lojas' : 'Minha loja'}
    >
      <FormContainer loading={loading}>
        <Form
          schema={validation()}
          onSubmit={handleSubmit}
          initialData={company}
        >
          <fieldset>
            <legend>
              <h2>Logo da loja</h2>
              <BackPage />
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
              name='responsible'
              type='text'
              label='Administrador(es)'
              placeholder='Responsáveis pela loja ex. Walter/Tiago'
            />
            <div className='field-group'>
              <Input name='email' type='email' label='Email' />
              {profile.company_provider && (
                <div className='field'>
                  <Datepicker
                    name='expires_at'
                    label='Data de expiração'
                    selected={expireDate}
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>
            <div className='field-group'>
              {/* <InputMaskPhone                
                name='phone'
                label='phone'
              /> */}
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
            </div>
            <div className='field-group'>
              <div className='field'>
                <InputMask
                  mask='99.999.999/9999-9'
                  name='cnpj'
                  type='tel'
                  label='CNPJ'
                />
              </div>
              <Input
                label='Site'
                name='site'
                type='text'
                placeholder='url do site da loja'
              />
            </div>
            {profile.company_provider && (
              <div className='field'>
                <label className='alt-check'>
                  <Check name='active' />
                  <span>Loja ativa</span>
                </label>
              </div>
            )}
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
              <Input name='uf' type='text' label='UF' />
              <Input name='city' type='text' label='Cidade' />
            </div>
            <div className='field-group'>
              <Input name='district' type='text' label='Bairro' />
              <Input name='street' type='text' label='Logradouro' />
            </div>
            <Input
              name='complement'
              type='text'
              label='Complemento'
              placeholder='Ex.: Nº 0000, fundos etc...'
            />
          </fieldset>

          <SubmitButton loading={loading ? true : false} text={'Salvar'} />
        </Form>
      </FormContainer>
    </Container>
  )
}

export default CompanyCreateEdit
