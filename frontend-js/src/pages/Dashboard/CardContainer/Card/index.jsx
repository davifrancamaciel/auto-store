import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

import { Container } from './styles'

function Card ({
  route,
  loaded,
  principal_text,
  secondary_text,
  title,
  icon,
  total
}) {

  return (
    <Link to={`/${route}`}>
      <Container
        loading={!loaded ? loaded.toString() : undefined}
        total={total}
      >
        <header>
          <p>{title}</p>
          {icon}
        </header>
        <h2>
          {loaded ? principal_text : <AiOutlineLoading3Quarters size={26} />}
        </h2>
        {loaded && <p>{secondary_text}</p>}
      </Container>
    </Link>
  )
}

export default Card
