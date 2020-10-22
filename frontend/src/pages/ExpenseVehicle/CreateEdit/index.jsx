import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Form } from '@rocketseat/unform'
import { parseISO, format } from 'date-fns'
import pt from 'date-fns/locale/pt'

import SubmitButton from '../../../components/SubmitButton'
import FormContainer from '../../../components/_layouts/FormContainer'
import BackPage from '../../../components/BackPage'
import InputMoney from '../../../components/Inputs/InputMoney'
import TextArea from '../../../components/Inputs/TextArea'
import Options from '../../Vehicle/List/Options'

import api from '../../../services/api'
import getValidationErrors from '../../../Utils/getValidationErrors'
import { priceToNumber } from '../../../Utils/formatPrice'
import showToast from '../../../Utils/showToast'
import { formatPrice } from '../../../Utils/formatPrice'
import ExpenseTypeEnum from '../../../enums/expenseTypes'
import validation from './validation'

import { ContainerExpenseVehicleForm } from './styles'

const INITIAL_STATE = {
  id: 0,
  description: '',
  value: null
}

export default function CreateEdit ({
  setExpense,
  expense,
  setExpensesList,
  expensesList
}) {
  const { id } = useParams()
  const vehicle_id = Number(id)
  const [loading, setLoading] = useState(false)


  async function handleSubmit (data) {
    try {
      const saveExpense = {
        ...data,
        value: priceToNumber(data.value),
        id: expense ? Number(expense.id) : 0,
        expense_type_id: expense.expense_type_id
          ? Number(expense.expense_type_id)
          : ExpenseTypeEnum.DESPESA_VEICULO_NAO_VENDIDO,
        vehicle_id
      }
      setExpense(saveExpense)
      setLoading(true)

      if (saveExpense.id) {
        const responseUpdate = await api.put('expenses', saveExpense)

        const expensesUpdated = expensesList.map(e => {
          if (e.id === responseUpdate.data.id) {
            return {
              ...e,
              value: responseUpdate.data.value,
              valueFormated: formatPrice(responseUpdate.data.value),
              description: responseUpdate.data.description
            }
          } else return { ...e }
        })
        setExpensesList(expensesUpdated)
        setExpense(INITIAL_STATE)
      } else {
        const responseNew = await api.post('expenses', saveExpense)
        const newExpense = {
          ...responseNew.data,
          type: { name: 'Despesa de veículo não vendido' },
          valueFormated: formatPrice(responseNew.data.value),
          createdAtFormatedDate: `Cadastrada no dia ${format(
            parseISO(responseNew.data.createdAt),
            "d 'de' MMMM",
            { locale: pt }
          )}`
        }
        setExpensesList([newExpense, ...expensesList])
        setExpense(INITIAL_STATE)
      }

      showToast.success(`Despesa salva com sucesso!`)

      setLoading(false)
    } catch (error) {
      getValidationErrors(error)
      setLoading(false)
    }
  }

  return (
    <ContainerExpenseVehicleForm>
      <FormContainer loading={loading}>
        <Form
          schema={validation()}
          onSubmit={handleSubmit}
          initialData={expense}
        >
          <fieldset>
            <legend>
              <Options id={id} />
              <BackPage />
            </legend>

            <div className='field'>
              <InputMoney name='value' label='Valor' />
            </div>

            <div className='field'>
              <TextArea name='description' label='Descrição' />
            </div>
          </fieldset>

          <SubmitButton loading={loading ? true : false} text={'Salvar'} />
        </Form>
      </FormContainer>
    </ContainerExpenseVehicleForm>
  )
}
