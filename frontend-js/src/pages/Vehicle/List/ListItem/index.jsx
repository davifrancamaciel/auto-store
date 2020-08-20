import React from 'react'
import { FiEdit, FiDelete } from 'react-icons/fi'

import {
  Li,
  Info,
  Actions,
  InfoStatus,
  ActiveStatus,
  ExpiredStatus
} from '../../../../components/ListContainer/styles'

function Item ({ item, onDeleteClick, onUpdateClick, provider }) {
  return (
    <Li active={item.active}>
      <header>
        {/* {provider && <img src={item.image} alt={item.name} />} */}
        <Info>
          <strong>
            {item.brand} {item.model} {item.type}
          </strong>
          <span>
            {item.year}
            {item.year_model && `/${item.year_model}`}
          </span>
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
        {item.uf} {item.city} {item.district} {item.street}
      </p>
      <p>
        <span>{item.priceFormated}</span>
      </p>

      <InfoStatus>
        <ActiveStatus active={item.active}>{`${
          item.active ? 'Ativo' : 'Inativo'
        }`}</ActiveStatus>
        <ExpiredStatus>{item.createdAtFormated}</ExpiredStatus>
      </InfoStatus>
    </Li>
  )
}
export default Item
