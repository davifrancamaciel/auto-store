import React from 'react'
import { Form, Select } from '@rocketseat/unform'
import Input from '../../../../components/Inputs/Input'
import SubmitButton from '../../../../components/SubmitButton'
import FormSearchContainer from '../../../../components/_layouts/FormSearchContainer'

const options = [
  { id: '', title: 'Todas' },
  { id: true, title: 'Somente ativas' },
  { id: false, title: 'Somente inativas' }
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
          <div className='field'>
            <Input name='name' label='Nome' />
          </div>
          <div className='field'>
            <Input name='email' label='Email' />
          </div>
          <div className='field'>
            <SubmitButton text={'Buscar'} />
          </div>
        </div>
      </Form>
    </FormSearchContainer>
  )
}
