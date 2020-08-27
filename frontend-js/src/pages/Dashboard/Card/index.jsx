import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

import { Container } from './styles'

function Card ({ route, loaded, item, title, icon, total, preposition }) {
  return (
    <Link to={`/${route}`}>
      <Container loading={!loaded ? !loaded.toString() : undefined} total={total}>
        <header>
          <p>{title}</p>
          {icon}
        </header>

        <h2>
          {loaded ? (
            `${item.inactive + item.active}`
          ) : (
            <AiOutlineLoading3Quarters size={26} />
          )}
        </h2>
        {loaded && (
          <p>
            {item.active} Ativ{preposition}s e {item.inactive} Inativ
            {preposition}s{' '}
          </p>
        )}
      </Container>
    </Link>
  )
}

export default Card
