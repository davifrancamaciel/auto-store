import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import history from '../../services/browserhistory'

import { Container } from './styles'

export default function BackPage () {
  return (
    <Container>
      <span
        onClick={() => {
          history.goBack()
        }}
      >
        <FiArrowLeft />
        Voltar
      </span>
    </Container>
  )
}
