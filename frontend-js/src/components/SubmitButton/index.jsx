import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import PropTypes from 'prop-types'

import { Button } from './styles'

function SubmitButton ({ loading = false, text }) {
  const _loading = loading

  return (
    <Button loading={_loading ? _loading.toString() : undefined} type='submit'>
      {_loading ? <AiOutlineLoading3Quarters size={26} /> : text}
    </Button>
  )
}

export default SubmitButton

SubmitButton.propTypes = {
  loading: PropTypes.bool,
  text: PropTypes.string
}

SubmitButton.defautProps = {
  loading: false,
  text: ''
}
