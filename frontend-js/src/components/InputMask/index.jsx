import React, { useEffect, useRef, useState } from 'react'
import { Input, useField } from '@rocketseat/unform'
import InputMask from 'react-input-mask'

const InputMaskWrapper = (
  { mask, name, label, type, onChangeCep, ...rest },
  props
) => {
  const { fieldName, defaultValue } = useField(name)
  const ref = useRef(null)
  const [maskValue, setmaskValue] = useState(defaultValue || '')

  useEffect(() => {
    setmaskValue(defaultValue || '')
  }, [defaultValue])

  function handleMask (e) {
    const { value } = e.target
    
    if (onChangeCep) onChangeCep(value)
    return setmaskValue(value)
  }

  return (
    <div className='field'>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <InputMask
        mask={mask}
        value={maskValue}
        ref={ref}
        onChange={e => handleMask(e)}
        >
        {() => (
          <Input name={name} type={type || 'text'} autoComplete='none' />
        )}
      </InputMask>
    </div>
  )
}

export default InputMaskWrapper
