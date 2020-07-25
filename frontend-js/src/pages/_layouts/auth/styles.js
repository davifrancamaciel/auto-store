import styled from 'styled-components'
import { darken } from 'polished'

export const Wrapper = styled.div`
  min-height: 100%;
  background: linear-gradient(-90deg, rgb(47, 135, 191), #0db5bc );
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;
      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    span {
      color: var(--secondary-color);
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }
    
    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
    }
  }
`
