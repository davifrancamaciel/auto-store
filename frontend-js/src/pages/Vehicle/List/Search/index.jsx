import React from 'react'
import { Form, Select } from '@rocketseat/unform'
import Input from '../../../../components/Inputs/Input'
import InputMask from '../../../../components/Inputs/InputMask'
import SubmitButton from '../../../../components/SubmitButton'
import FormSearchContainer from '../../../../components/_layouts/FormSearchContainer'

const options = [
  { id: '', title: 'Todos' },
  { id: true, title: 'Somente ativos' },
  { id: false, title: 'Somente inativos' }
]

export default function Search ({ onSearch, setPage }) {
  function handleSubmit (data) {
    let board = data.board.replace(/_/g, '')
    console.log(board.length)
    onSearch({
      ...data,
      year: data.year.replace(/\D/g, ''),
      board: board.length <= 4 ? board.replace(/-/g, '') : board
    })
    setPage(1)
  }

  return (
    <FormSearchContainer>
      <Form onSubmit={handleSubmit}>
        <div className='field-group'>
          <div className='field'>
            <Select label='Situação' name='status' options={options} />
          </div>
          <div className='field'>
            <Input name='brand' label='Marca' />
          </div>
          <div className='field'>
            <Input name='model' label='Modelo' />
          </div>
          <div className='field'>
            <InputMask mask='9999' name='year' type='tel' label='Ano' />
          </div>
          <div className='field'>
            <InputMask mask='***-****' type='text' name='board' label='Placa' />
          </div>
          <div className='field'>
            <SubmitButton text={'Buscar'} />
          </div>
        </div>
      </Form>
    </FormSearchContainer>
  )
}
