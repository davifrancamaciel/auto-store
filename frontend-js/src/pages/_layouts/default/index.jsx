import React from 'react'

import Header from '../../../components/Header'
import { Wrapper } from './styles'

const DefaultLayout = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      {children}
    </Wrapper>
  )
}

export default DefaultLayout
