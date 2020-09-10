import React from 'react'
import { FiEdit, FiDelete, FiPhone } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

import {
  Li,
  Info,
  Actions,
  InfoStatus,
  ActiveStatus
} from '../../../../components/_layouts/ListContainer/styles'

function Item ({ item, onDeleteClick, onUpdateClick, provider }) {
  return (
    <Li active={item.active}>
      <header>
        {provider && <img src={item.image} alt={item.name} />}
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
        {item.state} {item.city} {item.neighborhood} {item.street}
      </p>
      <p>{item.company.name}</p>
      <p>
        <span>
          {item.whatsapp && <FaWhatsapp size={20} />}
          <a
            href={`https://api.whatsapp.com/send?phone=+55${item.whatsapp}&text=`}
            target='_blank'
          >
            {item.whatsapp}
          </a>
        </span>
        <span>
          {item.phone && <FiPhone size={20} />}
          {item.phone}
        </span>
      </p>

      {item.provider && (
        <InfoStatus>
          <ActiveStatus active={item.active}>{`${
            item.active ? 'Ativo' : 'Inativo'
          }`}</ActiveStatus>
        </InfoStatus>
      )}
    </Li>
  )
}
export default Item
