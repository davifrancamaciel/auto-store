import React from 'react'
import PropTypes from 'prop-types'

import { Container } from './styles'

function FormContainer ({ children, loading = false }) {
  return (
    <Container loading={loading ? loading.toString() : undefined}>{children}</Container>
  )
}

export default FormContainer

FormContainer.propTypes = {
  loading: PropTypes.bool,  
}

FormContainer.defautProps = {
  loading: false
}
