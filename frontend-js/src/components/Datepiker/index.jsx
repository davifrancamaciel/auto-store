// import React, { useRef, useEffect, useState } from 'react'
// import ReactDatePicker from 'react-datepicker'

// import { useField } from '@rocketseat/unform'

// import 'react-datepicker/dist/react-datepicker.css'

// export default function DatePicker ({ name,label, ...rest }, props) {
//   const ref = useRef(null)
//   const { fieldName, registerField, defaultValue, error } = useField(name)
//   const [selected, setSelected] = useState(defaultValue)

//   useEffect(() => {
//     registerField({
//       name: fieldName,
//       ref: ref.current,
//       path: 'props.selected',
//       clearValue: pickerRef => {
//         pickerRef.clear()
//       }
//     })
//   }, [ref.current, fieldName]) // eslint-disable-line

//   return (
//     <>
//       {label && <label htmlFor={fieldName}>{label}</label>}
//       <ReactDatePicker
//         name={fieldName}
//         selected={selected}
//         onChange={date => setSelected(date)}
//         ref={ref}
//         {...rest}
//       />
//       {error && <span>{error}</span>}
//     </>
//   )
// }

import React, { useRef, useState, useEffect } from 'react'
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker'

import { useField, Input } from '@rocketseat/unform'

// import { useField } from '@unform/core';

import 'react-datepicker/dist/react-datepicker.css'

const DatePicker = ({ name, ...rest }) => {
  const datepickerRef = useRef(null)
  const { fieldName, registerField, defaultValue, error } = useField(name)

  const [date, setDate] = useState(defaultValue || null)

  useEffect(() => {
    console.log(date)
    registerField({
      name: fieldName,
      ref: datepickerRef.current,
      path: 'props.selected',
      clearValue: ref => {
        console.log(ref)
        ref.clear()
      },
      setValue: (e, v) => {
        setDate(new Date(v)) // <---- Setting up default value
      },
      getValue: () => {
        return datepickerRef.current.props.selected // to get selected value from Date picker's props
        // OR
        return Date.toString() // to get selected value from state it self
      }
    })
  }, [fieldName, registerField])

  return (
    <ReactDatePicker
      ref={datepickerRef}
      selected={date}
      onChange={setDate}
      dateFormat='dd/MM/yyyy'
      placeholderText='dd/mm/aaaa'
      writable='true'
      {...rest}
    />     
  )
}

export default DatePicker
