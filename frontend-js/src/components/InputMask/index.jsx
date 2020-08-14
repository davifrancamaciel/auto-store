import React, { useEffect, useRef, useState } from 'react'
import { Input, useField } from '@rocketseat/unform'
import PropTypes from 'prop-types'
import InputMask from 'react-input-mask'

const InputMaskWrapper = (
  { mask, name, label, type, onChangeCep, placeholder }  
) => {
  const { defaultValue } = useField(name)
  const ref = useRef(null)
  const [maskValue, setmaskValue] = useState(defaultValue || '')
  // console.log(name, defaultValue)

  useEffect(() => {
    setmaskValue(defaultValue || '')
  }, [defaultValue])

  function handleMask (e) {
    const { value } = e.target

    if (onChangeCep) onChangeCep(value)
    setmaskValue(value)
  }

  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}

      <InputMask
        mask={mask}
        value={maskValue}
        ref={ref}
        onChange={e => handleMask(e)}
      >
        {() => <Input name={name} type={type} placeholder={placeholder} autoComplete='none' />}
      </InputMask>
    </>
  )
}

export default InputMaskWrapper

InputMaskWrapper.propTypes = {
  loading: PropTypes.bool,
  text: PropTypes.string
}

InputMaskWrapper.defautProps = {
  mask: '',
  name: '',
  label: '',
  type: 'text',
  defaultValue: ''
}
