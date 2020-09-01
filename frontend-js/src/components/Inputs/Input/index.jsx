import React from 'react'
import { Input } from '@rocketseat/unform'

const InputWrapper = props => {
  return (
    <div className='field'>
      <Input type={props.type || 'text'} {...props} autoComplete="none"/>
    </div>
  )
}

export default InputWrapper
