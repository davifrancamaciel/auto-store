import React from 'react'
import { FiEdit, FiDelete } from 'react-icons/fi'

import Options from '../Options'

import {
  Li,
  Info,
  Actions,
  InfoStatus,
  ActiveStatus,
  ExpiredStatus
} from '../../../../components/_layouts/ListContainer/styles'

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
        <span>{item.priceFormated}</span>
      </p>

      <InfoStatus>
        <ActiveStatus active={item.active}>{`${
          item.active ? 'Ativo' : 'Inativo'
        }`}</ActiveStatus>
        <Options id={item.id} />
      </InfoStatus>
      <ExpiredStatus>{item.createdAtFormated}</ExpiredStatus>
    </Li>
  )
}
export default Item
