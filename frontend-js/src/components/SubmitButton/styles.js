import styled, { keyframes, css } from 'styled-components'
import { darken } from 'polished'

const rotate = keyframes`
from {
    transform: rotate(0deg);
}
to {
    transform: rotate(360deg);
}`

export const Button = styled.button`
  width: 100%;
  margin-top: 40px;
  transition: background-color 0.2s;
  cursor: pointer;
  margin: 10px 0 0;
  height: 44px;
  background: #ff8d08;
  font-weight: bold;
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 16px;
  opacity: ${props => (props && props.loading ? 0.5 : 1)};
  transition: background 0.2s;
  &:hover {
    background: ${darken(0.03, '#ff8d08')};
  }

  ${props =>
    props &&
    props.loading &&
    css`
      svg {
        font-weight: bold;
        animation: ${rotate} 2s linear infinite;
      }
    `}
`

export const Button2 = styled.button`
  width: 100%;
  margin-top: 40px;
  transition: background-color 0.2s;
  cursor: pointer;
  margin: 10px 0 0;
  height: 44px;
  background: #ff8d08;
  font-weight: bold;
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 16px;
  opacity: ${props => (props && props.loading ? 0.5 : 1)};
  transition: background 0.2s;
  &:hover {
    background: ${darken(0.03, '#ff8d08')};
  }

  ${props =>
    props &&
    props.loading &&
    css`
      svg {
        font-weight: bold;
        animation: ${rotate} 2s linear infinite;
      }
    `}
`