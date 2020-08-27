import React from 'react'

import Button from '../SubmitButton'
import { Container, Total } from './styles'

const LoadMore = ({ onClick, total, loadedItens }) => {
  return (
    <>
      {loadedItens > 0 && (
        <Total>
          Carregado {loadedItens} de {total}
        </Total>
      )}
      <Container>
        {loadedItens > 0 && loadedItens !== total && (
          <Button onClick={onClick} text={'Carregar mais'} />
        )}
      </Container>
    </>
  )
}

export default LoadMore
