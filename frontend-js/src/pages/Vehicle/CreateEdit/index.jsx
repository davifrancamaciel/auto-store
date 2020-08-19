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

const CreateEdit = () => {
  const [loading, setLoading] = useState(false)
  const [vehicle, setVehicle] = useState({})

  function handleSubmit (data) {}

  return (
    <Container title={'Cadastro de veículos'}>
      <FormContainer loading={loading}>
        <Form
          schema={validation()}
          onSubmit={handleSubmit}
          initialData={vehicle}
        >
          <fieldset>
            <legend>
              <h2>Imagens do veículo</h2>
              <BackPage />
            </legend>
            {/* <Dropzone
              onFileSelectedUpload={setSelectedImage}
              image={company.image}
            /> */}
          </fieldset>
          <fieldset>
            <legend>
              <h2>Dados</h2>
            </legend>
            <div className='field-group'>
              <Input name='marca' label='Marca' />
              <Input name='modelo' label='Modelo' />
            </div>
            <div className='field-group'>
              <Input name='tipo' label='Tipo' />
              <Input name='combustivel' label='Cobustivel' />
            </div>
            <div className='field-group'>
              <Input name='ano' type='text' label='Ano' />
              <Input name='ano' type='text' label='Ano modelo' />
              <Input name='placa' label='Placa' />
              <Input name='km' label='Km' />
            </div>
            <div className='field-group'>
              <div className='field'>
                <Datepicker
                  name='data_entrada'
                  label='Data de entrada'
                  // selected={expireDate}
                  // onChange={handleChange}
                />
              </div>
              <Input name='modelo' label='Modelo' />
            </div>
            <div className='field-group'></div>
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
                  name='telefone'
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
              <div className='field'>
                <InputMask mask='99999-999' label='Cep' name='cep' type='tel' />
              </div>
              <Input name='uf' type='text' label='UF' />
              <Input name='city' type='text' label='Cidade' />
            </div>
            <div className='field-group'>
              <Input name='bairro' type='text' label='Bairro' />
              <Input name='logradouro' type='text' label='Logradouro' />
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

export default CreateEdit
