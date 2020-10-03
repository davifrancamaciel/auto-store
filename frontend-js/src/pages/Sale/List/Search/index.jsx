import React, { useState } from 'react'
import { Form } from '@rocketseat/unform'
import { isBefore } from 'date-fns'

import Input from '../../../../components/Inputs/Input'
import InputMask from '../../../../components/Inputs/InputMask'
import Datepicker from '../../../../components/Inputs/Datepicker'
import SubmitButton from '../../../../components/SubmitButton'
import FormSearchContainer from '../../../../components/_layouts/FormSearchContainer'

import showToast from '../../../../Utils/showToast'

export default function Search ({ onSearch, setPage }) {
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()

  function handleSubmit (data) {
    if (isBefore(endDate, startDate)) {
      showToast.error('A data inicial não pode ser maior que a final.')
      return
    }
    let board = data.vehicle_board.replace(/_/g, '')
    onSearch({
      ...data,
      vehicle_board: board.length <= 4 ? board.replace(/-/g, '') : board
    })
    setPage(1)
  }

  return (
    <FormSearchContainer>
      <Form onSubmit={handleSubmit}>
        <div className='field-group'>
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
          <div className='field'>
            <Input name='user_name' label='Cliente' />
          </div>
          <div className='field'>
            <Input name='vehicle_model' label='Veículo' />
          </div>
          <div className='field'>
            <InputMask mask='***-****' type='text' name='vehicle_board' label='Placa' />
          </div>
          <div className='field'>
            <SubmitButton text={'Buscar'} />
          </div>
        </div>
      </Form>
    </FormSearchContainer>
  )
}
