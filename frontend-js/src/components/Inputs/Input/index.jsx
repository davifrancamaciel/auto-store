import React from 'react'
import { Input } from '@rocketseat/unform'

const InputWrapper = props => {
  return <Input type={props.type || 'text'} {...props} autoComplete='none' />
}

export default InputWrapper
