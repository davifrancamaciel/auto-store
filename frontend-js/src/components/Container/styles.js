import styled, { keyframes, css } from 'styled-components'

const rotate = keyframes`
from {
    transform: rotate(0deg);
}
to {
    transform: rotate(360deg);
}`

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 20px;
  opacity: ${props => (props && props.loading ? 0.5 : 1)};
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
  .gf-loading {
    display: none;
    ${props =>
      props &&
      props.loading &&
      css`
        left: 0;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        position: absolute;
        height: 100%;
        margin-top: 100px;

        > svg {
          color: var(--secondary-color);
          font-weight: bold;
          animation: ${rotate} 2s linear infinite;
        }
      `}
  }
`
