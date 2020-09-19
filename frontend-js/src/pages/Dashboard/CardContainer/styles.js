import styled from 'styled-components'

export const Container = styled.section`
  margin-bottom:40px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;
  @media (max-width: 780px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 530px) {
    grid-template-columns: repeat(1, 1fr);
  }
`
