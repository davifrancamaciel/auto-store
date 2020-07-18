import React from 'react'

import { Container } from './styles'

function FormContainer ({ children, loading }) {
  return <Container loading={loading}>{children}</Container>
}

export default FormContainer
