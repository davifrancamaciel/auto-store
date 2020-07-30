import React from 'react'
import { FiEdit, FiDelete, FiPhone } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

import { Container, Info, Actions } from './styles'

function Item ({ item, onDeleteClick, onUpdateClick }) {
  return (
    <Container>
      <header>
        <img src={item.image} alt={item.name} />
        <Info>
          <strong>{item.name}</strong>
          <span>{item.email}</span>
        </Info>
        <Actions>
          <button className='edit' onClick={() => onUpdateClick(item.id)}>
            <FiEdit size={20} color='#FFFFFF' />
          </button>
          <button className='delete' onClick={() => onDeleteClick(item)}>
            <FiDelete size={20} color='#FFFFFF' />
          </button>
        </Actions>
      </header>
      <p>
        {item.uf} {item.city} {item.bairro} {item.logradouro}
      </p>
      <p>
        <span>
          {item.whatsapp && <FaWhatsapp size={20} />}
          {item.whatsapp}
        </span>
        <span>
          {item.telefone && <FiPhone size={20} />}
          {item.telefone}
        </span>
      </p>

      {/* <a
        href={`https://www.google.com/maps/search/?api=1&query=${company.latitude},${company.longitude}`}
        target='_blank'
        rel='noopener noreferrer'
      >
        Maps
      </a> */}
    </Container>
  )
}
export default Item