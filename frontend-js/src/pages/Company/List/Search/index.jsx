import React from 'react'
import { Form } from '@rocketseat/unform'
import Input from '../../../../components/Input'
import SubmitButton from '../../../../components/SubmitButton'
import FormSearchContainer from '../../../../components/FormSearchContainer'

export default function Search ({ onSearch }) {
  function handleSubmit (data) {
    onSearch(data)
  }

  return (
    <FormSearchContainer>
      <Form onSubmit={handleSubmit}>
        <div className='field-group'>
          <Input name='name' label='Nome' />
          <Input name='email' label='Email' />
          <div className='field'>
            <SubmitButton text={'Buscar'} />
          </div>
        </div>
      </Form>
    </FormSearchContainer>
  )
}
