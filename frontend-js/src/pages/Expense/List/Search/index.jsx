import React, { useEffect, useState } from 'react'
import { Form, Select } from '@rocketseat/unform'
import { isBefore } from 'date-fns'

import Input from '../../../../components/Inputs/Input'
import Datepicker from '../../../../components/Inputs/Datepicker'
import SubmitButton from '../../../../components/SubmitButton'
import FormSearchContainer from '../../../../components/_layouts/FormSearchContainer'

import api from '../../../../services/api'
import getValidationErrors from '../../../../Utils/getValidationErrors'
import showToast from '../../../../Utils/showToast'

export default function Search ({ onSearch, setPage }) {
  const [options, setOptions] = useState([])
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()

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
    if (isBefore(endDate, startDate)) {
      showToast.error('A data inicial não pode ser maior que a final.')
      return
    }
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
          <div className='field'>
            <Datepicker
              name='start_date'
              label='Data de'
              selected={startDate}
              onChange={setStartDate}
            />
          </div>
          <div className='field'>
            <Datepicker
              name='end_date'
              label='Data ate'
              selected={endDate}
              onChange={setEndDate}
            />
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
