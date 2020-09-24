import React, { useRef, useEffect, useState } from 'react'

import { useField } from '@rocketseat/unform'
import { SelectCustom } from './styles'

export default function ReactSelect ({
  name,
  label,
  options,
  multiple,
  ...rest
}) {
  const ref = useRef(null)
  const { fieldName, registerField, defaultValue, error } = useField(name)
  const [selected, setSelected] = useState(defaultValue)
  const [itemSelected, setItemSelected] = useState()
  const [valueDefault, setvalueDefault] = useState(defaultValue)

  function parseSelectValue (selectRef) {
    const selectValue = selectRef.props.value
    // console.log(selectRef)
    if (!multiple) {
      var retorno = selectValue ? selectValue.value : ''
      return retorno
    }

    return selectValue ? selectValue.map(option => option.id) : []
  }

  useEffect(() => {
    setvalueDefault(defaultValue)
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'state.value',
      parseValue: parseSelectValue,
      clearValue: selectRef => {
        selectRef.select.clearValue()
      }
    })
  }, [ref.current, fieldName]) // eslint-disable-line

  useEffect(() => {
    setvalueDefault(defaultValue)
    setItemSelected(getDefaultValue())
  }, [options, defaultValue])

  function getDefaultValue () {
    if (!defaultValue) return null

    if (!multiple) {
      return options.find(option => option.value === valueDefault)
    }

    return options.filter(option => defaultValue.includes(option.id))
  }

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <SelectCustom
        classNamePrefix='react-select'
        placeholder=''
        name={fieldName}
        aria-label={fieldName}
        options={options}
        isMulti={multiple}
        value={getDefaultValue() ? getDefaultValue() : itemSelected}
        ref={ref}
        getOptionValue={option => option.value}
        getOptionLabel={option => option.label}
        onChange={date => {
          console.log(date)
          setSelected(date)
          setItemSelected(date)
          setvalueDefault(date.id)
        }}
        {...rest}
      />

      {error && <span>{error}</span>}
    </>
  )
}
