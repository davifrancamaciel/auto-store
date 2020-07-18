import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 20px;

  h1 {
    color: var(--secondary-color);
    margin-bottom: 30px;
  }
  > a {
    color: var(--secondary-color);
    margin-bottom: 15px;
    font-size: 16px;
    opacity: 0.8;
    justify-content: end;
    display: grid;
    &:hover {
      opacity: 1;
    }
  }
`
