import React, { useEffect } from 'react'
import { Form } from '@rocketseat/unform'
import { useSelector } from 'react-redux'
import Input from '../../../../components/Input'
import SubmitButton from '../../../../components/SubmitButton'
import FormSearchContainer from '../../../../components/FormSearchContainer'

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
            <Input name='company_name' label='Loja' />
          )}

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
