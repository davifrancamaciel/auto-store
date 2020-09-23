import React from 'react'

import Input from '../../../../components/Inputs/Input'
import InputMoney from '../../../../components/Inputs/InputMoney'

import Select from '../../../../components/Inputs/Select'
import BackPage from '../../../../components/BackPage'
// import { Container } from './styles';

function Client () {
  return (
    <>
      <fieldset>
        <legend>
          <h2>Dados</h2>
          <BackPage />
        </legend>

        <div className='field-group'>
          <div className='field'>
            <Input name='name' type='text' label='Nome' />
          </div>
          <div className='field'>
            <Input name='email' type='email' label='Email' />
          </div>
          <div className='field'>
            <Input
              mask='999.999.999-99'
              name='cpf_cnpj'
              type='tel'
              label='CPF'
            />
          </div>
        </div>
        <div className='field-group'>
          <div className='field'>
            <Input
              mask='(99) 99999-9999'
              name='whatsapp'
              type='tel'
              label='Whatsapp'
            />
          </div>
          <div className='field'>
            <Input
              mask='(99) 99999-9999'
              name='phone'
              type='tel'
              label='Telefone'
            />
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend>
          <h2>Endereço</h2>
        </legend>
        <div className='field-group'>
          <div className='field'>
            <Input mask='99999-999' label='Cep' name='zip_code' type='tel' />
          </div>
          <div className='field'>
            <Input name='state' type='text' label='UF' />
          </div>
          <div className='field'>
            <Input name='city' type='text' label='Cidade' />
          </div>
        </div>
        <div className='field-group'>
          <div className='field'>
            <Input name='neighborhood' type='text' label='Bairro' />
          </div>
          <div className='field'>
            <Input name='street' type='text' label='Logradouro' />
          </div>
          <div className='field'>
            <Input
              name='complement'
              type='text'
              label='Complemento'
              placeholder='Ex.: Nº 0000, fundos etc...'
            />
          </div>
        </div>
      </fieldset>
    </>
  )
}

export default Client
