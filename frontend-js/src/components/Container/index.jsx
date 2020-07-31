import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

import { Container } from './styles'

function WrapperContainer ({ children, title, loading }) {
  return (
    <Container loading={loading}>
      {title && <h1>{title}</h1>}
      <div className='gf-loading'>
        <AiOutlineLoading3Quarters size={90} />
      </div>
      {children}
    </Container>
  )
}

export default WrapperContainer
