import React from 'react'

import { Container } from './styles'

function FormSearchContainer ({ children, loading }) {
  return <Container loading={loading}>{children}</Container>
}

export default FormSearchContainer
