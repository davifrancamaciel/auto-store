import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import CreateEdit from './CreateEdit'
import List from './List'
import Container from '../../components/_layouts/Container'

import getValidationErrors from '../../Utils/getValidationErrors'
import api from '../../services/api'
import history from '../../services/browserhistory'
import { formatPrice } from '../../Utils/formatPrice'

import { ContainerExpenseVehicle } from './styles'

const ExpenseVehicleList = function () {
  const { id } = useParams()
  const [vehicle, setVehicle] = useState({})
  const [title, setTitle] = useState()
  const [expense, setExpense] = useState({})
  const [expensesList, setExpensesList] = useState([])
  const [totalValue, setTotalValue] = useState()

  useEffect(() => {
    const total = expensesList.reduce((totalSum, expense) => {
      return Number(totalSum) + Number(expense.value)
    }, 0)
    setTotalValue(total)
  }, [expensesList])

  useEffect(() => {
    const complement = vehicle.brand
      ? `${vehicle.brand} ${vehicle.model}`
      : vehicle.model
    vehicle.model && setTitle(`Despesas do veículo ${complement}`)
  }, [vehicle])

  useEffect(() => {
    if (id) {
      async function loadVehicle (id) {
        try {
          const response = await api.get(`vehicles/${id}`)
          setVehicle(response.data)
        } catch (error) {
          getValidationErrors(error)
          history.push('/vehicle')
        }
      }
      loadVehicle(id)
    } else {
      history.push('/vehicle')
    }
  }, [])

  return (
    <Container title={title}>
      <span>Total de despesas {formatPrice(totalValue)}</span>
      <ContainerExpenseVehicle>
        <CreateEdit
          expense={expense}
          setExpensesList={setExpensesList}
          expensesList={expensesList}
          setExpense={setExpense}
        />
        <List
          setExpensesList={setExpensesList}
          setExpense={setExpense}
          expensesList={expensesList}
        />
      </ContainerExpenseVehicle>
    </Container>
  )
}

export default ExpenseVehicleList
