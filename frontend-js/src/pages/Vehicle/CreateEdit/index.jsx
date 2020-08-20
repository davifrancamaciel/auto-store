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
  const profile = useSelector(state => state.user.profile)
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [vehicle, setVehicle] = useState({})

  useEffect(() => {
    if (id) {
      async function loadVehicle (id) {
        try {
          setLoading(true)
          const response = await api.get(`vehicles/${id}`)

          setVehicle(response.data)
          setLoading(false)
        } catch (error) {
          setLoading(false)
          getValidationErrors(error)
        }
      }
      loadVehicle(id)
    } else {
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
        // year_model: data.year_model ? data.year_model : null,
        // year: data.year ? data.year : null,
        // km: data.km ? data.km : null,
        // amount_oil: data.amount_oil ? data.amount_oil : null,
        // optional: data.optional ? data.optional : null,
        // value: data.value ? data.value : null
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
              <Input name='year' type='text' label='Ano' />
              <Input name='year_model' type='text' label='Ano modelo' />
              <Input name='board' label='Placa' />
              <Input name='km' label='Km' />
            </div>
            <div className='field-group'>
              <div className='field'>
                <Datepicker
                  name='input_date'
                  label='Data de entrada'
                  // selected={expireDate}
                  // onChange={handleChange}
                />
              </div>
              <Input name='description' label='Descrição' />
            </div>
            <Input name='value' label='Valor' />
            <Input name='amount_oil' label='Quantidade de óleo' />
            <Input name='optional' label='Opicionais' />

            <div className='field'>
              <label className='alt-check'>
                <Check name='active' />
                <span>Loja ativa</span>
              </label>
            </div>
          </fieldset>

          <SubmitButton loading={loading ? true : false} text={'Salvar'} />
        </Form>
      </FormContainer>
    </Container>
  )
}

export default CreateEdit
