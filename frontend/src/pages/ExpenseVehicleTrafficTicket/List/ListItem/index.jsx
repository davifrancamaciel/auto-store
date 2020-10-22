import React from 'react'
import { FiEdit, FiDelete } from 'react-icons/fi'

import {
  Li,
  Info,
  Actions,
  InfoStatus,
  ExpiredStatus
} from '../../../../components/_layouts/ListContainer/styles'

function Item ({ item, onDeleteClick, onUpdateClick }) {
  return (
    <Li>
      <header>
        <Info>
          <strong>{item.type.name}</strong>
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

      <InfoStatus>
        <p>{item.description}</p>
        <p>{item.valueFormated}</p>
      </InfoStatus>
      <InfoStatus>
        <ExpiredStatus>{item.createdAtFormatedDate}</ExpiredStatus>
      </InfoStatus>
    </Li>
  )
}
export default Item
