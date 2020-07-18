import React from 'react'
import { FiRefreshCw } from 'react-icons/fi'

import { Button } from './styles'

export default function SubmitButton (props) {
  const _loading = props && props.loading ? props.loading : false
  return (
    <Button loading={_loading} type='submit'>
      {_loading ? <FiRefreshCw size={26} /> : props.text}
    </Button>
  )
}
