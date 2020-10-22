import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Check } from '@rocketseat/unform'
import { parseISO } from 'date-fns'

import Container from '../../../components/_layouts/Container'
import SubmitButton from '../../../components/SubmitButton'
import FormContainer from '../../../components/_layouts/FormContainer'

import showToast from '../../../Utils/showToast'
import api from '../../../services/api'
import history from '../../../services/browserhistory'
import getValidationErrors from '../../../Utils/getValidationErrors'
import { priceToNumber } from '../../../Utils/formatPrice'

import Input from '../../../components/Inputs/Input'
import InputMask from '../../../components/Inputs/InputMask'
import InputMoney from '../../../components/Inputs/InputMoney'
import InputMilhar from '../../../components/Inputs/InputMilhar'
import Datepicker from '../../../components/Inputs/Datepicker'

import Select from '../../../components/Inputs/Select'
import BackPage from '../../../components/BackPage'
import ProfitExpectation from './ProfitExpectation'
import TotalSale from './TotalSale'
import validation from './validation'
import { getSaleFinancial, getSaleOrigins } from '../../../Utils/saleConstants'

const SaleCreateEdit = () => {
  const { id } = useParams()
  const [saleDate, setSaleDate] = useState()
  const [loading, setLoading] = useState(false)
  const [clients, setClients] = useState([])
  const [vehicles, setVehicles] = useState([])
  const [sale, setSale] = useState({})
  const [origins, setorigins] = useState([])
  const [financial, setFinancial] = useState([])
  const [selectedVehicle, setSelectedVehicle] = useState({})
  const [values, setValues] = useState({})
  const [valueSaleVehicle, setValueSaleVehicle] = useState(0)
  
  useEffect(() => {
    setorigins(getSaleOrigins())
    setFinancial(getSaleFinancial())

    if (id) {
      async function loadSale (id) {
        try {
          setLoading(true)
          const response = await api.get(`sales/${id}`)

          setSale(response.data)
          setSelectedVehicle({ value: response.data.vehicle_id })
          setLoading(false)
          if (response.data.sale_date) {
            setSaleDate(parseISO(response.data.sale_date))
          }
        } catch (error) {
          setLoading(false)
          getValidationErrors(error)
        }
      }
      loadSale(id)
    } else {
      setSaleDate(new Date())
      setSale({
        ...sale
      })
    }

    async function loadVehicles () {
      try {
        let whereStatement = {}
        if (!id) whereStatement.active = true

        const response = await api.get('vehicles-list', {
          params: { ...whereStatement }
        })
        setVehicles(response.data)
      } catch (error) {
        getValidationErrors(error)
      }
    }
    loadVehicles()
    async function loadUsers () {
      try {
        let whereStatement = {}
        if (!id) whereStatement.active = true
        const response = await api.get('users-list', {
          params: { ...whereStatement }
        })
        setClients(response.data)
      } catch (error) {
        getValidationErrors(error)
      }
    }
    loadUsers()
  }, [])

  useEffect(() => {
    setValues({
      input_value: priceToNumber(sale.input_value) || 0,
      vehicle_input_value: priceToNumber(sale.vehicle_input_value) || 0,
      financed_value: priceToNumber(sale.financed_value) || 0
    })
  }, [sale])

  async function handleSubmit (data) {
    try {
      const input_value = priceToNumber(data.input_value)
      const vehicle_input_value = priceToNumber(data.vehicle_input_value)
      const financed_value = priceToNumber(data.financed_value)

      const saveSale = {
        ...data,
        id: id ? Number(id) : 0,
        input_value,
        vehicle_input_value,
        financed_value,
        value: input_value + vehicle_input_value + financed_value
      }

      setLoading(true)

      if (saveSale.id) {
        await api.put('sales', saveSale)
      } else {
        await api.post('sales', saveSale)
      }

      showToast.success(`Venda salva com sucesso!`)

      setLoading(false)
      history.push(`/sale`)
    } catch (error) {
      getValidationErrors(error)
      setLoading(false)
    }
  }

  return (
    <Container title={`Venda de veículos`}>
      <FormContainer loading={loading} large>
        <Form schema={validation()} onSubmit={handleSubmit} initialData={sale}>
          <fieldset>
            <legend>
              <h2>Dados do cliente e veículo</h2>
              <BackPage />
            </legend>

            <div className='field-group'>
              <div className='field'>
                <Select label='Cliente' name='user_id' options={clients} />
              </div>
              <div className='field'>
                <Select
                  label='Veículo'
                  name='vehicle_id'
                  options={vehicles}
                  onSelected={setSelectedVehicle}
                />
              </div>
            </div>
            <div className='field-group'>
              <div className='field'>
                <Select
                  label='Origem da venda'
                  name='origin'
                  options={origins}
                />
              </div>

              <div className='field'>
                <Datepicker
                  name='sale_date'
                  label='Data da venda'
                  selected={saleDate}
                  onChange={setSaleDate}
                />
              </div>
            </div>
            <div className='field-group'>
              <div className='field'>
                <InputMilhar
                  name='next_exchange_oil'
                  label='Próxima troca de Óleo'
                />
              </div>
              <div className='field'>
                <InputMask
                  mask='9999'
                  name='last_crlv'
                  type='tel'
                  label='Último CRLV'
                />
              </div>
              <div className='field'>
                <InputMask
                  mask='9999'
                  name='paid_out_ipva'
                  type='tel'
                  label='IPVA PAGO'
                />
              </div>
            </div>

            <div className='field-group'>
              <div className='field'>
                <label className='alt-check'>
                  <Check name='delivered_receipt' />
                  <span>Recibo (CRV) entregue</span>
                </label>
              </div>
              <div className='field'>
                <label className='alt-check'>
                  <Check name='checklist_delivery' />
                  <span>Checklist de entrega realizado</span>
                </label>
              </div>
              <div className='field'>
                <label className='alt-check'>
                  <Check name='checklist_auto' />
                  <span>Check auto</span>
                </label>
              </div>
            </div>

            <div className='field-group'>
              <div className='field'>
                <label className='alt-check'>
                  <Check name='alienation_low' />
                  <span>Duda Baixa alienação</span>
                </label>
              </div>

              <div className='field'>
                <label className='alt-check'>
                  <Check name='report_precautionary' />
                  <span>Laudo cautelar</span>
                </label>
              </div>
              <div className='field'></div>
            </div>

            <div className='field-group'>
              <div className='field'>
                <label className='alt-check'>
                  <Check name='there_anything' />
                  <span>Nada consta</span>
                </label>
              </div>
              <div className='field'>
                <label className='alt-check'>
                  <Check name='discounted_sale_value' />
                  <span>Abatidas do valor da venda (cliente pagar)</span>
                </label>
              </div>
              <div className='field'>
                <label className='alt-check'>
                  <Check name='not_discounted_sale_value' />
                  <span>Não abatidas (Loja pagar)</span>
                </label>
              </div>
            </div>
          </fieldset>

          <ProfitExpectation
            selectedVehicle={selectedVehicle}
            setValueSaleVehicle={setValueSaleVehicle}
          />
          <fieldset>
            <legend>
              <h2>Valores e formas de pagamento</h2>
              <TotalSale values={values} valueSaleVehicle={valueSaleVehicle} />
            </legend>
            <p>
              <i>
                Caso o valor total desta venda seja diferente do valor de venda
                do veículo selecionado, o valor de venda do mesmo será alterado
                para o valor total desta venda.
              </i>
            </p>

            <div className='field-group'>
              <div className='field'>
                <InputMoney
                  name='input_value'
                  label='Valor de entrada'
                  onKeyUp={e =>
                    setValues({
                      ...values,
                      input_value: priceToNumber(e.target.value)
                    })
                  }
                />
              </div>

              <div className='field'>
                <Input
                  name='input_value_description'
                  label='Descrição do valor de entrada'
                />
              </div>
            </div>

            <div className='field-group'>
              <div className='field'>
                <InputMoney
                  name='vehicle_input_value'
                  label='Valor do veículo de entrada'
                  onKeyUp={e =>
                    setValues({
                      ...values,
                      vehicle_input_value: priceToNumber(e.target.value)
                    })
                  }
                />
              </div>

              <div className='field'>
                <Input
                  name='vehicle_input_value_description'
                  label='Descrição do veículo de entrada'
                />
              </div>
            </div>
            <div className='field-group'>
              <div className='field'>
                <InputMoney
                  name='financed_value'
                  label='Valor financiado'
                  onKeyUp={e =>
                    setValues({
                      ...values,
                      financed_value: priceToNumber(e.target.value)
                    })
                  }
                />
              </div>

              <div className='field'>
                <Select
                  label='Financeira'
                  name='financed_value_financial'
                  options={financial}
                />
              </div>
            </div>
            <div className='field'>
              <Input
                name='financed_value_description'
                label='Descrição do valor financiado'
              />
            </div>
          </fieldset>
          <fieldset>
            <legend>
              <h2>Informações adicionais</h2>
            </legend>
            <div className='field'>
              <Input multiline name='additional_note' />
            </div>
          </fieldset>

          <SubmitButton loading={loading ? true : false} text={'Salvar'} />
        </Form>
      </FormContainer>
    </Container>
  )
}

export default SaleCreateEdit
