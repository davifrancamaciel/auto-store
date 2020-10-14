import React from 'react'
import { FiEdit, FiDelete } from 'react-icons/fi'

import {
  Li,
  Info,
  Actions,
  InfoStatus,
  ResponsiveText,
  ExpiredStatus
} from '../../../../components/_layouts/ListContainer/styles'

function Item ({ item, onDeleteClick, onUpdateClick }) {
  return (
    <Li>
      <header>
        <Info>
          <strong>
            {item.vehicle.brand} {item.vehicle.model}{' '}
            <span className='as-to-uppercase'>{item.vehicle.board}</span>
          </strong>
          <span>{item.valueFormated}</span>
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

      <ResponsiveText>{item.user.name}</ResponsiveText>
      {/* <InfoStatus>
        <ResponsiveText>{item.user.name}</ResponsiveText>
        <span>Ver contrato</span>
      </InfoStatus> */}

      <InfoStatus>
        <ExpiredStatus>{item.createdAtFormated}</ExpiredStatus>
        <ExpiredStatus>{item.saleDateFormated}</ExpiredStatus>
      </InfoStatus>
    </Li>
  )
}
export default Item
