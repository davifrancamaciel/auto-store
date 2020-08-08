import React from 'react'
import PropTypes from 'prop-types'

import { Container } from './styles'

function FormSearchContainer ({ children, loading = false }) {
  return (
    <Container loading={loading ? loading : undefined}>{children}</Container>
  )
}

export default FormSearchContainer

FormSearchContainer.propTypes = {
  loading: PropTypes.bool,  
}

FormSearchContainer.defautProps = {
  loading: false
}
