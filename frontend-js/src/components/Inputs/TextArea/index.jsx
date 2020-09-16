import React, { useEffect, useRef, useState } from 'react'
import { useField } from '@rocketseat/unform'

export default function Input ({ name, label, ...rest }) {
  const [textValue, setTextValue] = useState()
  const inputRef = useRef(null)
  const { fieldName, defaultValue, registerField, error } = useField(name)

  useEffect(() => {
    setTextValue(defaultValue ? defaultValue : '')
  }, [defaultValue])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField, textValue])

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <textarea
        ref={inputRef}
        {...rest}
        value={textValue || ''}
        onChange={e => setTextValue(e.target.value)}
      >
        {textValue || ''}
      </textarea>
      {error && <span>{error}</span>}
    </>
  )
}
