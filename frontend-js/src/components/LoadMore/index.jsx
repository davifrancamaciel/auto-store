import React from 'react'

import Button from '../SubmitButton'

import { Container } from './styles'

const LoadMore = ({ onClick, total, loadedItens }) => {
  console.log(loadedItens, total)
  
  return (
    <Container>
      {loadedItens > 0 && loadedItens !== total && (
        <Button onClick={onClick} text={'Carregar mais'} />
      )}
    </Container>
  )
}

export default LoadMore
