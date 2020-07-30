import React from 'react'
import { FiRefreshCw } from 'react-icons/fi'

import { Container } from './styles'

function WrapperContainer ({ children, title, loading }) {
  return (
    <Container loading={loading}>
      {title && <h1>{title}</h1>}
      <div className='gf-loading'>
        <FiRefreshCw size={90} />
      </div>
      {children}
    </Container>
  )
}

export default WrapperContainer
