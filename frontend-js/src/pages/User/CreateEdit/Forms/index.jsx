import React, { useState } from 'react'
import { parseISO } from 'date-fns'

import { Form as FormRo, Check } from '@rocketseat/unform'
import { Form } from '@unform/web'


import Select from '../../../../components/Select'

const options = [
  {
    id: 1,
    title: 'Auto shop'
  },
  {
    id: 9,
    title: 'errique auto'
  }
]
const model = {
   company_id: 9
}

function Forms ({ companies }) {
  console.log(companies)
  console.log(model)
  return (
    <div>
      <Form initialData={model}>
        <Select label='Loja' name='company_id' options={options} />
      </Form>
      <FormRo initialData={model}>
        <Select label='Loja' name='company_id' options={options} />
      </FormRo>
      <FormRo initialData={model}>
        <Select label='Loja' name='company_id' options={companies} />
      </FormRo>
    </div>
  )
}

export default Forms
