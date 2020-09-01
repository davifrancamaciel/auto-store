import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { parseISO } from 'date-fns'

import { Form, Check } from '@rocketseat/unform'

import Container from '../../../components/_layouts/Container'
import SubmitButton from '../../../components/SubmitButton'
import FormContainer from '../../../components/_layouts/FormContainer'
import Dropzone from '../../../components/Inputs/Dropzone'
import Input from '../../../components/Inputs/Input'
import Datepicker from '../../../components/Inputs/Datepicker'
import InputMoney from '../../../components/Inputs/InputMoney'
import InputMask from '../../../components/Inputs/InputMask'
import BackPage from '../../../components/BackPage'

import api from '../../../services/api'
import history from '../../../services/browserhistory'
import getValidationErrors from '../../../Utils/getValidationErrors'
import { priceToNumber } from '../../../Utils/formatPrice'
import showToast from '../../../Utils/showToast'

import getImage from '../../../Utils/getImage'

import validation from './validation'

const CreateEdit = () => {
  const profile = useSelector(state => state.user.profile)
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [vehicle, setVehicle] = useState({})
  const [inputDate, setInputDate] = useState()

  useEffect(() => {
    if (id) {
      async function loadVehicle (id) {
        try {
          setLoading(true)
          const response = await api.get(`vehicles/${id}`)

          setVehicle(response.data)
          setLoading(false)
          if (response.data.input_date) {
            setInputDate(parseISO(response.data.input_date))
          }
        } catch (error) {
          setLoading(false)
          getValidationErrors(error)
        }
      }
      loadVehicle(id)
    } else {
      setInputDate(new Date())
      setVehicle({
        ...vehicle,
        active: true
      })
    }
  }, [])

  async function handleSubmit (data) {
    console.log(data)
    try {
      const saveVehicle = {
        ...data,
        id: id ? Number(id) : 0,
        company_id: profile.company_id,
        year_model: data.year_model ? data.year_model : 0,
        year: data.year ? data.year : 0,
        km: data.km ? data.km : 0,
        amount_oil: data.amount_oil ? data.amount_oil : 0,
        value: data.value ? priceToNumber(data.value) : 0
      }

      setLoading(true)

      if (saveVehicle.id) {
        await api.put('vehicles', saveVehicle)
      } else {
        await api.post('vehicles', saveVehicle)
      }

      showToast.success(`Veículo salvo com sucesso!`)

      setLoading(false)
      history.push(`/vehicle`)
    } catch (error) {
      getValidationErrors(error)
      setLoading(false)
    }
  }

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
              <Input name='brand' label='Marca' />
              <Input name='model' label='Modelo' />
            </div>
            <div className='field-group'>
              <Input name='type' label='Tipo' />
              <Input name='fuel' label='Cobustivel' />
            </div>
            <div className='field-group'>
              <div className='field'>
                <InputMask mask='9999' name='year' type='tel' label='Ano' />
              </div>
              <div className='field'>
                <InputMask
                  mask='9999'
                  name='year_model'
                  type='tel'
                  label='Ano modelo'
                />
              </div>
              <div className='field'>
                <InputMask
                  mask='***-****'
                  type='text'
                  name='board'
                  label='Placa'
                />
              </div>
              <Input name='km' label='Km' />
            </div>
            <div className='field-group'>
              <div className='field'>
                <Datepicker
                  name='input_date'
                  label='Data de entrada'
                  selected={inputDate}
                  onChange={setInputDate}
                />
              </div>
              <div className='field'>
                <InputMoney name='value' label='Valor' />
              </div>
            </div>

            <Input name='amount_oil' label='Quantidade de óleo' />
            <Input multiline name='optional' label='Opicionais' />
            <Input multiline name='description' label='Descrição' />
            <div className='field'>
              <label className='alt-check'>
                <Check name='active' />
                <span>Ativo</span>
              </label>
            </div>
          </fieldset>
          <fieldset>
            <legend>
              <h2>Este veículo possui</h2>
            </legend>
            <div className='field-group'>
              <div className='field'>
                <label className='alt-check'>
                  <Check name='receipt' />
                  <span>Recibo</span>
                </label>
              </div>
              <div className='field'>
                <label className='alt-check'>
                  <Check name='manual' />
                  <span>Manual</span>
                </label>
              </div>
              <div className='field'>
                <label className='alt-check'>
                  <Check name='key_copy' />
                  <span>Cópia de chave</span>
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

export default CreateEdit
