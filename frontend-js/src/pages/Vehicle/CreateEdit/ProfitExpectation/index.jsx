import React, { useState, useEffect } from 'react'
import api from '../../../../services/api'
import { formatPrice } from '../../../../Utils/formatPrice'

import { Container, Td } from './styles'

const ProfitExpectation = ({ vehicle, values }) => {
  const [expensesList, setExpensesList] = useState([])
  const [totalExpenseValue, setTotalExpenseValue] = useState(0)

  useEffect(() => {
    async function loadExpenses () {
      try {
        const response = await api.get('expenses', {
          params: {
            limit: 50,
            vehicle_id: vehicle.id,
            constant: [
              'MULTA_PAGA',
              'DESPESA_VEICULO_NAO_VENDIDO',
              'DESPESA_VEICULO_VENDIDO'
            ]
          }
        })
        setExpensesList(response.data.rows)
      } catch (error) {}
    }

    vehicle.id && loadExpenses()
  }, [vehicle])

  useEffect(() => {
    const total = expensesList.reduce((totalSum, expense) => {
      return Number(totalSum) + Number(expense.value)
    }, 0)
    setTotalExpenseValue(total)
  }, [expensesList])

  function renderRolw () {
    const value_sale_formated = formatPrice(values.value_sale || 0)
    const value_purchase_formated = formatPrice(values.value_purchase || 0)
    const value_expense_formated = formatPrice(totalExpenseValue || 0)
    const value_profit =
      values.value_sale - values.value_purchase - totalExpenseValue || 0
    const value_profit_formated = formatPrice(value_profit)

    return (
      <tr>
        <td>{value_sale_formated}</td>
        <td>{value_purchase_formated}</td>
        <td>{value_expense_formated}</td>
        <Td damage={value_profit < 0}>{value_profit_formated}</Td>
      </tr>
    )
  }

  return (
    <Container>
      <p>Espectativa de lucro</p>
      <table>
        <thead>
          <tr>
            <th>Valor de venda</th>
            <th>Valor de compra</th>
            <th>Valor de despesas</th>
            <th>Lucro liquido </th>
          </tr>
        </thead>
        <tbody>{renderRolw()}</tbody>
      </table>
    </Container>
  )
}

export default ProfitExpectation
