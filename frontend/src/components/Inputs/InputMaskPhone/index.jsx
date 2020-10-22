import React, { useState, useEffect ,useRef} from 'react'
import { Input, useField } from '@rocketseat/unform'
import InputMask from 'react-input-mask'
import { trim, size } from 'lodash'

const PhoneInput = ({ name, label, ...props }) => {
  const { fieldName, defaultValue } = useField(name)
  const ref = useRef(null)
  
  const [mask, setMask] = useState('(99) 99999-9999')
  const [maskValue, setmaskValue] = useState(defaultValue || '')

  useEffect(() => {
    setmaskValue(defaultValue || '')
  }, [defaultValue])

  function handleMask (e) {
    const { value } = e.target
    
    return setmaskValue(value)
  }

  return (
    <div className='field'>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <InputMask
        {...props}
        mask={mask}
        value={maskValue}
        ref={ref}
        onChange={e => handleMask(e)}
        onBlur={e => {
          if (size(trim(e.target.value, '_')) === 14) {
            setMask('(99) 9999-9999')
          }
        }}
        onFocus={e => {
          if (size(trim(e.target.value, '_')) === 14) {
            setMask('(99) 99999-9999')
          }
        }}        
      >
        {() => <Input name={name} type='tel' autoComplete='none' />}
      </InputMask>
    </div>
  )
}
export default PhoneInput
