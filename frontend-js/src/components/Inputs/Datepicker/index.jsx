import React, { useRef, useEffect, useState } from 'react'
import ReactDatePicker, { registerLocale } from 'react-datepicker'
import pt from 'date-fns/locale/pt'

import { useField } from '@rocketseat/unform'

import 'react-datepicker/dist/react-datepicker.css'

export default function DatePicker ({ name, label, ...rest }, props) {
  registerLocale('pt', pt)
  const ref = useRef(null)
  const { fieldName, registerField, defaultValue, error } = useField(name)
  const [selected, setSelected] = useState(defaultValue)
  
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear()
      }
    })
  }, [ref.current, fieldName]) // eslint-disable-line

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <ReactDatePicker
        locale='pt'
        name={fieldName}
        selected={selected}
        onChange={date => setSelected(date)}
        ref={ref}
        dateFormat='dd/MM/yyyy'
        {...rest}
      />

      {error && <span>{error}</span>}
    </>
  )
}
