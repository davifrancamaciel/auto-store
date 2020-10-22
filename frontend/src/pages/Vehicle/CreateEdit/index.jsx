import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { parseISO } from 'date-fns'

import { Form, Check } from '@rocketseat/unform'

import Container from '../../../components/_layouts/Container'
import SubmitButton from '../../../components/SubmitButton'
import FormContainer from '../../../components/_layouts/FormContainer'
import Input from '../../../components/Inputs/Input'
import Datepicker from '../../../components/Inputs/Datepicker'
import InputMoney from '../../../components/Inputs/InputMoney'
import InputMask from '../../../components/Inputs/InputMask'
import InputMilhar from '../../../components/Inputs/InputMilhar'
import BackPage from '../../../components/BackPage'
import Options from '../List/Options'
import ProfitExpectation from './ProfitExpectation'

import api from '../../../services/api'
import history from '../../../services/browserhistory'
import getValidationErrors from '../../../Utils/getValidationErrors'
import { priceToNumber } from '../../../Utils/formatPrice'
import showToast from '../../../Utils/showToast'

import validation from './validation'

const CreateEdit = () => {
  const profile = useSelector(state => state.user.profile)
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [vehicle, setVehicle] = useState({})
  const [inputDate, setInputDate] = useState()
  const [values, setValues] = useState({})

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

  useEffect(() => {
    setValues({
      value_purchase: vehicle.value_purchase,
      value_sale: vehicle.value_sale
    })
  }, [vehicle])

  async function handleSubmit (data) {
    try {
      const saveVehicle = {
        ...data,
        id: id ? Number(id) : 0,
        company_id: profile.company_id,
        year_model: data.year_model ? priceToNumber(data.year_model) : 0,
        year: data.year ? priceToNumber(data.year) : 0,
        km: data.km ? priceToNumber(data.km) : 0,
        amount_oil: data.amount_oil ? priceToNumber(data.amount_oil) : 0,
        value_sale: data.value_sale ? priceToNumber(data.value_sale) : 0,
        value_purchase: data.value_purchase
          ? priceToNumber(data.value_purchase)
          : 0
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
      <FormContainer loading={loading} large>
        <Form
          schema={validation()}
          onSubmit={handleSubmit}
          initialData={vehicle}
        >
          <fieldset>
            <legend>
              <h2>Dados</h2>
              <BackPage />
            </legend>

            {id && (
              <legend>
                <h2></h2>
                <Options id={vehicle.id} />
              </legend>
            )}

            <div className='field-group'>
              <div className='field'>
                <Input name='brand' label='Marca' />
              </div>
              <div className='field'>
                <Input name='model' label='Modelo' />
              </div>
            </div>
            <div className='field-group'>
              <div className='field'>
                <Input name='type' label='Tipo' />
              </div>
              <div className='field'>
                <Input name='fuel' label='Cobustivel' />
              </div>
            </div>
            <div className='field-group'>
              <div className='field'>
                <InputMask mask='9999' name='year' type='tel' label='Ano fabricação' />
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
              <div className='field'>
                <InputMilhar name='km' label='Km' />
              </div>
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
                <InputMilhar name='amount_oil' label='Quantidade de óleo' />
              </div>
            </div>

            <div className='field-group'>
              <div className='field'>
                <Input name='renavam' label='RENAVAM' />
              </div>
              <div className='field'>
                <Input name='color' label='Cor' />
              </div>
            </div>
            <div className='field'>
              <Input multiline name='optional' label='Opcionais' />
            </div>
            <div className='field'>
              <Input multiline name='description' label='Descrição' />
            </div>
            <div className='field-group'>
              <div className='field'>
                <InputMoney
                  name='value_purchase'
                  label='Valor de compra'
                  onKeyUp={e =>
                    setValues({
                      ...values,
                      value_purchase: priceToNumber(e.target.value)
                    })
                  }
                />
              </div>
              <div className='field'>
                <InputMoney
                  name='value_sale'
                  label='Valor de venda'
                  onKeyUp={e =>
                    setValues({
                      ...values,
                      value_sale: priceToNumber(e.target.value)
                    })
                  }
                />
              </div>
            </div>
            <ProfitExpectation vehicle={vehicle} values={values} />
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
