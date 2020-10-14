import React, { useState, useEffect } from 'react'
import api from '../../../../services/api'
import { formatPrice } from '../../../../Utils/formatPrice'

import { Container, Td } from './styles'

const ProfitExpectation = ({ selectedVehicle, setValueSaleVehicle }) => {
  const [expensesList, setExpensesList] = useState([])
  const [totalExpenseValue, setTotalExpenseValue] = useState(0)
  const [vehicle, setVehicle] = useState({})

  useEffect(() => {
    async function loadExpenses () {
      try {
        const response = await api.get('expenses', {
          params: { limit: 50, vehicle_id: selectedVehicle.value }
        })
        setExpensesList(response.data.rows)
      } catch (error) {}
    }

    selectedVehicle.value && loadExpenses()

    async function loadVehicle () {
      try {
        const response = await api.get(`vehicles/${selectedVehicle.value}`)
        setVehicle(response.data)
        setValueSaleVehicle(response.data.value_sale)
      } catch (error) {}
    }

    selectedVehicle.value && loadVehicle()
  }, [selectedVehicle])

  useEffect(() => {
    const total = expensesList.reduce((totalSum, expense) => {
      return Number(totalSum) + Number(expense.value)
    }, 0)
    setTotalExpenseValue(total)
  }, [expensesList])

  function renderRolw () {
    const value_sale_formated = formatPrice(vehicle.value_sale || 0)
    const value_purchase_formated = formatPrice(vehicle.value_purchase || 0)
    const value_expense_formated = formatPrice(totalExpenseValue || 0)
    const value_profit =
      vehicle.value_sale - vehicle.value_purchase - totalExpenseValue || 0
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
      <h2>Espectativa de lucro para o veículo selecionado</h2>
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
