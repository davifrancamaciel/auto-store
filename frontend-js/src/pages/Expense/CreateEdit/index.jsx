import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Check } from '@rocketseat/unform'
import { useSelector } from 'react-redux'

import Container from '../../../components/Container'
import SubmitButton from '../../../components/SubmitButton'
import FormContainer from '../../../components/FormContainer'
import Input from '../../../components/Input'
import InputMask from '../../../components/InputMask'
import BackPage from '../../../components/BackPage'
import Select from '../../../components/Select'

import showToast from '../../../Utils/showToast'
import api from '../../../services/api'
import history from '../../../services/browserhistory'
import getValidationErrors from '../../../Utils/getValidationErrors'
import {
  formatValueWhithDecimalCaseOnChange,
  formatValueWhithDecimalCase,
  formatValueWhithOutDecimalCase,
  priceToNumber
} from '../../../Utils/formatPrice'
import validation from './validation'

const ExpenseCreateEdit = function () {
  const { id } = useParams()
  const [expense, setExpese] = useState({})
  const [loading, setLoading] = useState(false)
  const [types, setTypes] = useState([])
  const [numericValue, setNumericValue] = useState(0)

  useEffect(() => {
    console.log(numericValue)
    console.log(formatValueWhithDecimalCaseOnChange(numericValue))
    console.log(formatValueWhithDecimalCase(numericValue))
    console.log(formatValueWhithOutDecimalCase(numericValue))

    console.log(expense)
  }, [numericValue])

  useEffect(() => {
    async function loadExpensesTypes () {
      try {
        const response = await api.get('expenses-types')
        setTypes(response.data)
      } catch (error) {
        getValidationErrors(error)
      }
    }
    loadExpensesTypes()
  }, [])

  useEffect(() => {
    if (id) {
      async function loadExpense (id) {
        try {
          setLoading(true)
          const response = await api.get(`expenses/${id}`)

          const data = {
            ...response.data,
            value: formatValueWhithDecimalCase(response.data.value)
          }
          setNumericValue(response.data.value)
          setExpese(data)
          setLoading(false)
        } catch (error) {
          setLoading(false)
          getValidationErrors(error)
        }
      }
      loadExpense(id)
    }
  }, [])

  async function handleSubmit (data) {
    console.log(data)
    try {
      const saveExpense = {
        ...data,
        value: priceToNumber(data.value),
        id: id ? Number(id) : 0
      }

      setLoading(true)

      if (saveExpense.id) {
        await api.put('expenses', saveExpense)
      } else {
        await api.post('expenses', saveExpense)
      }

      showToast.success(`Despesa salva com sucesso!`)

      setLoading(false)
      history.push(`/expense`)
    } catch (error) {
      getValidationErrors(error)
      setLoading(false)
    }
  }

  return (
    <Container title={`Cadastro de despesas`}>
      <FormContainer loading={loading}>
        <Form
          schema={validation()}
          onSubmit={handleSubmit}
          initialData={expense}
        >
          <fieldset>
            <legend>
              <h2>Dados</h2>
              <BackPage />
            </legend>

            <div className='field-group'>
              <div className='field'>
                <Select label='Tipo' name='expense_type_id' options={types} />
              </div>
              <div className='field'>
                <Input
                  name='value'
                  type='tel'
                  label='Valor'
                  value={expense.value}
                  onChange={e => {
                    // setNumericValue(e.target.value)
                    setExpese({
                      ...expense,
                      value: formatValueWhithDecimalCaseOnChange(e.target.value)
                    })
                  }}
                />
              </div>
            </div>
            <Input multiline name='description' label='Descrição' />
          </fieldset>

          <SubmitButton loading={loading ? true : false} text={'Salvar'} />
        </Form>
      </FormContainer>
    </Container>
  )
}

export default ExpenseCreateEdit
