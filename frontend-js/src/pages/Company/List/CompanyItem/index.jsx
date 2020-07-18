import React from 'react'
import { FiEdit, FiDelete } from 'react-icons/fi'

import { Container, Info, Actions } from './styles'

function companyItem ({ company, onDeleteClick, onUpdateClick }) {
  return (
    <Container>
      <header>
        <img
          src={`https://api.adorable.io/avatar/50/${company.name}.png`}
          alt={company.name}
        />
        <Info>
          <strong>{company.name}</strong>
          <span>{company.email}</span>
        </Info>
        <Actions>
          <button className='edit' onClick={() => onUpdateClick(company.id)}>
            <FiEdit size={20} color='#FFFFFF' />
          </button>
          <button className='delete' onClick={() => onDeleteClick(company.id)}>
            <FiDelete size={20} color='#FFFFFF' />
          </button>
        </Actions>
      </header>
      <p>
        {company.uf}, {company.city}, {company.bairro}, {company.logradouro}
      </p>
      <p>
        {company.whatsapp} - {company.telefone}
      </p>

      <a
        href={`https://www.google.com/maps/search/?api=1&query=${company.latitude},${company.longitude}`}
        target='_blank'
        rel='noopener noreferrer'
      >
        Maps
      </a>
    </Container>
  )
}
export default companyItem
