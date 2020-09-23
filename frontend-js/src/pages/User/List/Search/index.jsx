import React, { useEffect } from 'react'
import { Form } from '@rocketseat/unform'
import { useSelector } from 'react-redux'
import Input from '../../../../components/Inputs/Input'
import SubmitButton from '../../../../components/SubmitButton'
import FormSearchContainer from '../../../../components/_layouts/FormSearchContainer'

export default function Search ({ onSearch, provider, setPage }) {
  const profile = useSelector(state => state.user.profile)

  useEffect(() => {
    console.log('reset form', profile)
  }, [provider])

  function handleSubmit (data) {
    onSearch(data)
    setPage(1)
  }

  return (
    <FormSearchContainer>
      <Form onSubmit={handleSubmit}>
        <div className='field-group'>
          {profile.company_provider && (
            <div className='field'>
              <Input name='company_name' label='Loja' />
            </div>
          )}

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
