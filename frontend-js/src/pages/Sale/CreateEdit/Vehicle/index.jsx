import React from 'react'

import Input from '../../../../components/Inputs/Input'
import InputMoney from '../../../../components/Inputs/InputMoney'

import Select from '../../../../components/Inputs/Select'
import BackPage from '../../../../components/BackPage'

function Vehicle () {
  return (
    <fieldset>
      <legend>
        <h2>Dados do veículo</h2>
        <BackPage />
      </legend>

      <div className='field-group'>
        <div className='field'>
          <Input name='brand' label='Marca' />
        </div>
        <div className='field'>
          <Input name='model' label='Modelo' />
        </div>
     
        <div className='field'>
          <Input name='type' label='Tipo' />
        </div>
        <div className='field'>
          <Input name='fuel' label='Cobustivel' />
        </div>
      </div>
      <div className='field-group'>
        <div className='field'>
          <Input mask='9999' name='year' type='tel' label='Ano' />
        </div>
        <div className='field'>
          <Input
            mask='9999'
            name='year_model'
            type='tel'
            label='Ano modelo'
          />
        </div>
        <div className='field'>
          <Input mask='***-****' type='text' name='board' label='Placa' />
        </div>
        <div className='field'>
          <Input name='km' label='Km' />
        </div>
      </div>
    </fieldset>
  )
}

export default Vehicle
