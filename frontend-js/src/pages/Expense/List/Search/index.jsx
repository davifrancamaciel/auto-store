import React, { useEffect, useState } from 'react'
import { Form, Select } from '@rocketseat/unform'

import Input from '../../../../components/Input'
import SubmitButton from '../../../../components/SubmitButton'
import FormSearchContainer from '../../../../components/FormSearchContainer'

import api from '../../../../services/api'
import getValidationErrors from '../../../../Utils/getValidationErrors'

export default function Search ({ onSearch, setPage }) {
  const [options, setOptions] = useState([])

  useEffect(() => {
    async function loadExpensesTypes () {
      try {
        const response = await api.get('expenses-types')
        setOptions(response.data)
      } catch (error) {
        getValidationErrors(error)
      }
    }
    loadExpensesTypes()
  }, [])

  function handleSubmit (data) {
    onSearch(data)
    setPage(1)
  }

  return (
    <FormSearchContainer>
      <Form onSubmit={handleSubmit}>
        <div className='field-group'>
          <div className='field'>
            <Select label='Tipo' name='expense_type_id' options={options} />
          </div>
          <Input name='description' label='Descrição' />
          {/* <Input name='email' label='Email' /> */}
          <div className='field'>
            <SubmitButton text={'Buscar'} />
          </div>
        </div>
      </Form>
    </FormSearchContainer>
  )
}
