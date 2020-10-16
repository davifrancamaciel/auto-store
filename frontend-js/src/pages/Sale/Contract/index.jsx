import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { parseISO, format } from 'date-fns'
import pt from 'date-fns/locale/pt'

import api from '../../../services/api'
import getValidationErrors from '../../../Utils/getValidationErrors'
import {
  formatPrice,
  formatValueWhithOutDecimalCase
} from '../../../Utils/formatPrice'
import { getSaleFinancial, getSaleOrigins } from '../../../Utils/saleConstants'
import checkReport from '../../../Utils/checkReport'

import ContractReport from '../../../components/Report/Sale'
import Container from '../../../components/_layouts/Container'

const Contract = function () {
  const { id } = useParams()
  const [sale, setSale] = useState()
  const [loading, setLoading] = useState(false)
  const [expensesList, setExpensesList] = useState([])
  const [totalExpenseValue, setTotalExpenseValue] = useState(0)

  function handleGetSaleOrigin (originValue) {
    const orgin = getSaleOrigins().find(x => x.value === originValue)
    return orgin ? orgin.label : ''
  }

  function handleGetSaleFinancial (financialValue) {
    const financial = getSaleFinancial().find(x => x.value === financialValue)
    return financial ? financial.label : ''
  }

  useEffect(() => {
    async function loadSale (id) {
      try {
        setLoading(true)
        const response = await api.get(`sales/${id}`)
        const { data } = response

        const saleFormated = {
          ...data,
          value: formatPrice(data.value),
          financed_value: formatPrice(data.financed_value),
          input_value: formatPrice(data.input_value),
          vehicle_input_value: formatPrice(data.vehicle_input_value),
          origin: handleGetSaleOrigin(data.origin),
          financed_value_financial: handleGetSaleFinancial(
            data.financed_value_financial
          ),
          delivered_receipt: checkReport(data.delivered_receipt),
          delivery_receipt: checkReport(!data.delivered_receipt),
          alienation_low: checkReport(data.alienation_low),
          report_precautionary: checkReport(data.report_precautionary),
          there_anything: checkReport(data.there_anything),
          discounted_sale_value: checkReport(data.discounted_sale_value),
          not_discounted_sale_value: checkReport(
            data.not_discounted_sale_value
          ),
          checklist_auto: checkReport(data.checklist_auto),
          checklist_delivery: checkReport(data.checklist_delivery),
          sale_date: format(parseISO(data.sale_date), "d 'de' MMMM 'de' yyyy", {
            locale: pt
          }),
          vehicle: {
            ...data.vehicle,
            km: formatValueWhithOutDecimalCase(data.vehicle.km)
          },
          user: {
            ...data.user,
            birth_date: data.user.birth_date
              ? format(parseISO(data.user.birth_date), 'dd/MM/yyyy')
              : ''
          }
        }

        setSale(saleFormated)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        getValidationErrors(error)
      }
    }
    loadSale(id)
  }, [id])

  useEffect(() => {
    async function loadExpenses () {
      try {
        const response = await api.get('expenses', {
          params: {
            limit: 50,
            vehicle_id: sale.vehicle_id,
            constant: ['MULTA_PAGA', 'MULTA_NAO_PAGA']
          }
        })

        const data = response.data.rows.map(expense => ({
          ...expense,
          value: formatPrice(expense.value)
        }))
        setExpensesList(data)
      } catch (error) {}
    }

    !!sale && loadExpenses()
  }, [sale])

  useEffect(() => {
    const total = expensesList.reduce((totalSum, expense) => {
      return Number(totalSum) + Number(expense.value)
    }, 0)
    setTotalExpenseValue(formatPrice(total))
  }, [expensesList])

  return (
    <Container loading={loading ? Boolean(loading) : undefined}>
      {!!sale && (
        <ContractReport
          sale={sale}
          expensesList={expensesList}
          totalExpenseValue={totalExpenseValue}
        />
      )}
    </Container>
  )
}

export default Contract
