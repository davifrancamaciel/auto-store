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

  h1 {
    color: var(--secondary-color);
    margin-bottom: 30px;
  }
  > span {
    display: flex;
    flex-direction: row;
    text-align: center;
    justify-content: flex-end;

    > a {
      color: var(--text-color);
      margin-bottom: 15px;
      font-size: 16px;
      font-weight: bold;
      justify-content: end;
      display: flex;
      opacity: 1;
      align-items: center;

      > svg {
        color: var(--secondary-color);
        margin-right: 10px;
      }
      &:hover {
        opacity: 0.8;
      }
    }
  }
  .gf-loading {
    display: none;
    ${props =>
      props.loading &&
      css`
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 99;
        background: rgba(255, 255, 255, 0.5);
        left: 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
        min-height: 100%;
        align-items: center;

        > svg {
          color: var(--secondary-color);
          font-weight: bold;
          animation: ${rotate} 2s linear infinite;
        }
      `}
  }
`
