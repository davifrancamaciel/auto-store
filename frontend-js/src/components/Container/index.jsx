import React from 'react'

import { Container } from './styles'

function WrapperContainer ({ children, title }) {
  return (
    <Container>
      {title && <h1>{title}</h1>}
      {children}
    </Container>
  )
}

export default WrapperContainer
