import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import PropTypes from 'prop-types'

import { Container } from './styles'

function WrapperContainer ({ loading = false, children, title }) {
  const _loading = loading
  return (
    <Container loading={_loading ? _loading.toString() : undefined}>
      {title && <h1>{title}</h1>}
      <div className='as-loading'>
        <AiOutlineLoading3Quarters size={90} />
      </div>
      {children}
    </Container>
  )
}

export default WrapperContainer

WrapperContainer.propTypes = {
  loading: PropTypes.bool,
  title: PropTypes.string
}

WrapperContainer.defautProps = {
  loading: false,
  text: ''
}
