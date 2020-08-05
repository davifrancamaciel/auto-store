import React from 'react'
import { FiEdit, FiDelete, FiPhone } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

import { Li, Info, Actions } from '../../../../components/ListContainer/styles'

function Item ({ item, onDeleteClick, onUpdateClick }) {
  return (
    <Li>
      <header>
        <img src={item.image} alt={item.name} />
        <Info>
          <strong>{item.name}</strong>
          <span>{item.email}</span>
          <span>{item.responsavel}</span>
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
      {item.responsavel && <p>Administrador(es) {item.responsavel}</p>}
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
    </Li>
  )
}
export default Item
