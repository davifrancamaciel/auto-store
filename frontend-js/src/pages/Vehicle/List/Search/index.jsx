import React from 'react'
import { Form, Select } from '@rocketseat/unform'
import Input from '../../../../components/Input'
import SubmitButton from '../../../../components/SubmitButton'
import FormSearchContainer from '../../../../components/FormSearchContainer'

const options = [
  { id: '', title: 'Todos' },
  { id: true, title: 'Somente ativos' },
  { id: false, title: 'Somente inativos' }
]

export default function Search ({ onSearch, setPage }) {
  function handleSubmit (data) {
    onSearch(data)
    setPage(1)
  }

  return (
    <FormSearchContainer>
      <Form onSubmit={handleSubmit}>
        <div className='field-group'>
          <div className='field'>
            <Select label='Situação' name='status' options={options} />
          </div>
          <Input name='brand' label='Marca' />
          <Input name='model' label='Modelo' />
          <Input name='year' label='Ano' />
          <div className='field'>
            <SubmitButton text={'Buscar'} />
          </div>
        </div>
      </Form>
    </FormSearchContainer>
  )
}
