import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 12px;
  
  button[type='submit'] {
    width: 260px;
  }
  
  @media (max-width: 720px) {
    button[type='submit'] {
      width: 100%;
    }
  }
`
