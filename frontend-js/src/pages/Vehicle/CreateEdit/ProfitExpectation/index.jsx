import React, { useState, useEffect } from 'react'
import api from '../../../../services/api'

const ProfitExpectation = ({ vehicle, values }) => {
  const [expensesList, setExpensesList] = useState([])
  const [totalExpenseValue, setTotalExpenseValue] = useState()

  useEffect(() => {
    async function loadExpenses () {
      try {
        const response = await api.get('expenses', {
          params: { limit: 50, vehicle_id: vehicle.id }
        })
        setExpensesList(response.data.rows)
      } catch (error) {}
    }

    loadExpenses()
  }, [vehicle])

  useEffect(() => {
    const total = expensesList.reduce((totalSum, expense) => {
      return Number(totalSum) + Number(expense.value)
    }, 0)
    setTotalExpenseValue(total)
  }, [expensesList])

  useEffect(() => {
    console.log(values)
  }, [values])

  return (
    <div>
      <p>Espectativa de lucro</p>
      <p>valor de venda - (valor de compra + total de despesas)</p>
      <p>
        {totalExpenseValue} {values.value_purchase} {values.value_sale}
      </p>
    </div>
  )
}

export default ProfitExpectation
