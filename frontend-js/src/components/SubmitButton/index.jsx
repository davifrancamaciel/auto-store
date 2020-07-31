import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

import { Button } from './styles'

function SubmitButton (props) {
  if(!props) return
  const _loading = props && props.loading ? props.loading : false
  
  return (
    <Button loading={_loading} type='submit'>
      {_loading ? <AiOutlineLoading3Quarters size={26} /> : props.text}
    </Button>
  )
}

export default SubmitButton
