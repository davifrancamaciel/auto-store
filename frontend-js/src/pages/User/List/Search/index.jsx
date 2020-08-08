import React, { useEffect } from 'react'
import { Form } from '@rocketseat/unform'
import { useSelector } from 'react-redux'
import Input from '../../../../components/Input'
import SubmitButton from '../../../../components/SubmitButton'
import FormSearchContainer from '../../../../components/FormSearchContainer'
import { useState } from 'react'

const INITIAL_DATA = {
  company_name: '',
  name: '',
  email: ''
}

export default function Search ({ onSearch, provider }) {
  const profile = useSelector(state => state.user.profile)
  const [searchData, setSearchData] = useState({ ...INITIAL_DATA })

  useEffect(() => {
    console.log('reset form', profile)
    setSearchData({ ...INITIAL_DATA })
  }, [provider])

  function handleSubmit (data) {
    onSearch(data)
  }

  return (
    <FormSearchContainer>
      <Form onSubmit={handleSubmit} initialData={searchData}>
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
