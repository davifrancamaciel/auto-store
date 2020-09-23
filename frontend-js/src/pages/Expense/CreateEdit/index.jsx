import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Form } from '@rocketseat/unform'

import Container from '../../../components/_layouts/Container'
import SubmitButton from '../../../components/SubmitButton'
import FormContainer from '../../../components/_layouts/FormContainer'
import Input from '../../../components/Inputs/Input'
import InputMoney from '../../../components/Inputs/InputMoney'
import BackPage from '../../../components/BackPage'
import Select from '../../../components/Inputs/Select'

import showToast from '../../../Utils/showToast'
import api from '../../../services/api'
import history from '../../../services/browserhistory'
import getValidationErrors from '../../../Utils/getValidationErrors'
import { priceToNumber } from '../../../Utils/formatPrice'
import validation from './validation'

const ExpenseCreateEdit = function () {
  const { id } = useParams()
  const [expense, setExpese] = useState({})
  const [loading, setLoading] = useState(false)
  const [types, setTypes] = useState([])

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

          setExpese(response.data)
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
                <InputMoney name='value' label='Valor' />
              </div>
            </div>
            <div className='field'>
              <Input multiline name='description' label='Descrição' />
            </div>
          </fieldset>

          <SubmitButton loading={loading ? true : false} text={'Salvar'} />
        </Form>
      </FormContainer>
    </Container>
  )
}

export default ExpenseCreateEdit
