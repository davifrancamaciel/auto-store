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

const Contract = function () {
  const { id } = useParams()
  const [sale, setSale] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log(checkReport(true))
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
          origin:
            getSaleOrigins().find(x => x.value === data.origin).label || '',
          financed_value_financial:
            getSaleFinancial().find(
              x => x.value === data.financed_value_financial
            ).label || '',
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
        console.log(saleFormated)
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
    console.log(sale)
  }, [sale])

  return <div>{!!sale && <ContractReport sale={sale} />}</div>
}

export default Contract
