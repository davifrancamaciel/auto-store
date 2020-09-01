import React, { useEffect, useRef, useState } from 'react'
import { useField } from '@rocketseat/unform'
import {
  formatValueWhithDecimalCaseOnChange,
  formatValueWhithDecimalCase
} from '../../../Utils/formatPrice'

export default function Input ({ name, label, ...rest }) {
  const [numericValue, setNumericValue] = useState()
  const inputRef = useRef(null)
  const { fieldName, defaultValue, registerField, error } = useField(name)

  useEffect(() => {
    setNumericValue(
      defaultValue ? formatValueWhithDecimalCase(defaultValue) : ''
    )
  }, [defaultValue])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField, numericValue])

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <input
        ref={inputRef}
        {...rest}
        value={numericValue || ''}
        type='tel'
        onChange={e =>
          setNumericValue(formatValueWhithDecimalCaseOnChange(e.target.value))
        }
      />
      {error && <span>{error}</span>}
    </>
  )
}
