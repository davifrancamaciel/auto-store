import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

import { formatPrice } from '../../../Utils/formatPrice'

import { Container } from './styles'

function Card ({ route, loaded, item, title, icon, total }) {
  const [totalValue, setTotalValue] = useState()
  useEffect(() => {
    if (item && item.rows) {
      const total = item.rows.reduce((totalSum, expense) => {
        return Number(totalSum) + Number(expense.value)
      }, 0)
      setTotalValue(formatPrice(total))
    }
  }, [item])

  return (
    <Link to={`/${route}`}>
      <Container
        loading={!loaded ? !loaded.toString() : undefined}
        total={total}
      >
        <header>
          <p>{title}</p>
          {icon}
        </header>

        <h2>
          {loaded ? `${item.count}` : <AiOutlineLoading3Quarters size={26} />}
        </h2>
        {loaded && <p>{totalValue}</p>}
      </Container>
    </Link>
  )
}

export default Card
