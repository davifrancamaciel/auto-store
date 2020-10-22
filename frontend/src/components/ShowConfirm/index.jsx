import React from 'react'
import { confirmAlert } from 'react-confirm-alert' // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { Container } from './styles'

export default function show (title, message, onClickYes, onClickNo) {

  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <Container>
          <h1>{title}</h1>
          <p>{message}</p>
          <button
            onClick={() => {
              onClickYes()
              onClose()
            }}
          >
            Sim
          </button>
          <button onClick={onClose}>Não</button>
        </Container>
      )
    }
  })
}
