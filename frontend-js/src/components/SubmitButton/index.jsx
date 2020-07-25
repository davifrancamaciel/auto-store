import React from 'react'
import { FiRefreshCw } from 'react-icons/fi'

import { Button } from './styles'

function SubmitButton (props) {
  if(!props) return
  const _loading = props && props.loading ? props.loading : false
  console.log(_loading)
  return (
    <Button loading={_loading} type='submit'>
      {_loading ? <FiRefreshCw size={26} /> : props.text}
    </Button>
  )
}

export default SubmitButton
