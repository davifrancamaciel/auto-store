import React, { useState, useEffect } from 'react'

import { formatPrice } from '../../../../Utils/formatPrice'

import { Container } from './styles'

const TotalSale = ({ values, valueSaleVehicle }) => {
  const [saleTotalValue, setSaleTotalValue] = useState(0)

  useEffect(() => {
    const total =
      values.input_value + values.vehicle_input_value + values.financed_value
    setSaleTotalValue(total || 0)
  }, [values])

  return (
    <Container damage={saleTotalValue < valueSaleVehicle}>
      Total da venda {formatPrice(saleTotalValue)}
    </Container>
  )
}

export default TotalSale
