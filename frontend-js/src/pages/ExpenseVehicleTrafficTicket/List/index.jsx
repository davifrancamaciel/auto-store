import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { parseISO, format } from 'date-fns'
import pt from 'date-fns/locale/pt'

import Container from '../../../components/_layouts/Container'
import ShowConfirm from '../../../components/ShowConfirm'
import ListItem from './ListItem'

import api from '../../../services/api'
import getValidationErrors from '../../../Utils/getValidationErrors'
import showToast from '../../../Utils/showToast'
import { formatPrice } from '../../../Utils/formatPrice'
import ExpenseTypeEnum from '../../../enums/expenseTypes'

import { Ul } from '../../../components/_layouts/ListContainer/styles'
import { Main } from './styles'

const ExpenseList = function ({ setExpensesList, setExpense, expensesList }) {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function loadExpenses () {
      try {
        setLoading(true)

        const response = await api.get('expenses', {
          params: {
            limit: 50,
            vehicle_id: id,
            expense_type_id: [
              ExpenseTypeEnum.MULTA_PAGA,
              ExpenseTypeEnum.MULTA_NAO_PAGA
            ]
          }
        })

        const data = response.data.rows.map(expense => ({
          ...expense,
          valueFormated: formatPrice(expense.value),
          createdAtFormatedDate: `Cadastrada no dia ${format(
            parseISO(expense.createdAt),
            "d 'de' MMMM",
            { locale: pt }
          )}`
        }))

        setExpensesList(data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        getValidationErrors(error)
      }
    }

    loadExpenses()
  }, [])

  async function handleDelete (item) {
    ShowConfirm(
      'Atenção',
      `Confirma a remoção do auto de infração ${item.description}?`,
      () => handleDeleteConfirm(item.id)
    )
  }

  async function handleDeleteConfirm (id) {
    try {
      setLoading(true)
      await api.delete(`expenses/${id}`)

      showToast.success('Multa excluída com sucesso!')
      const updateExpenses = expensesList.filter(c => c.id !== id)
      setExpensesList(updateExpenses)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      getValidationErrors(error)
    }
  }

  function handleUpdate (id) {
    const selectedExpense = expensesList.find(x => x.id == id)
    setExpense(selectedExpense)
  }

  return (
    <Container loading={loading ? Boolean(loading) : undefined}>
      <Main>
        <Ul>
          {expensesList.map(expense => (
            <ListItem
              item={expense}
              key={expense.id}
              onUpdateClick={handleUpdate}
              onDeleteClick={handleDelete}
            />
          ))}
        </Ul>
      </Main>
    </Container>
  )
}

export default ExpenseList
