import styled from 'styled-components'
import { lighten } from 'polished'

export const Container = styled.div`
  margin: 45px auto;
  padding: 64px;
  max-width: 730px;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 0 14px 0 #00000033;
  display: flex;
  flex-direction: column;

  fieldset {
    min-inline-size: auto;
    border: 0;
  }

  legend {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    margin-top: 30px;
  }

  legend h2 {
    font-size: 24px;
    color: var(--secondary-color);
  }

  legend span {
    font-size: 14px;
    font-weight: bold;
    display: flex;
    align-items: center;
    color: var(--text-color);
    > span {
      cursor: pointer;
      transition: color 0.2s;
      &:hover {
        color: ${lighten(0.08, '#6c6c80')};
      }
      > svg {
        color: var(--secondary-color);
        margin-right: 16px;
      }
    }
  }

  .field-group {
    flex: 1;
    display: flex;
  }

  .field {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    opacity: ${props => (props.loading ? 0.5 : 1)};
  }

  .field input[type='text'],
  .field input[type='email'],
  .field input[type='number'],
  .field input[type='password'],
  .field input[type='tel'] {
    flex: 1;
    background: #f0f0f5;
    border-radius: 4px;
    border: 0;
    padding: 13px 15px;
    font-size: 16px;
    color: #6c6c80;
    height: 44px;
    max-height: 44px;
    width: 100%;
    margin: 0 0 0px;
  }
  .feld .alt-check{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .field .alt-check span{
    font-size: 14px;
    margin-bottom: -2px;
    color: #6c6c80;
    font-weight: initial;
    margin-left: 5px;
    align-items: baseline;

  }
  .field input[type='checkbox'] {
    
  }

  .field input::placeholder {
    color: #a0a0b2;
  }
  .field select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    flex: 1;
    background: #f0f0f5;
    border-radius: 4px;
    border: 0;
    padding: 13px 15px;
    font-size: 16px;
    color: #6c6c80;
    height: 44px;
    max-height: 44px;
  }

  .field label {
    font-size: 14px;
    margin-bottom: 8px;
    color: #6c6c80;
  }

  .field span {
    color: var(--secondary-color);
    align-self: flex-start;
    margin: 0 0 10px;
    font-weight: bold;
  }
  .field-group .field + .field {
    margin-left: 24px;
  }

  .field-group input + input {
    margin-left: 24px;
  }

  .field-check label {
    margin: 0 0 0 8px;
  }

  button {
    width: 260px;
    align-self: flex-end;
    float: right;
  }
  @media (max-width: 720px) {
    padding-right: 20px;
    padding-left: 20px;
    .field-group .field + .field {
      margin-left: 0px;
    }
    .field-group {      
      display: block;
    }
    button {
      width: 100%;
    }
  }
`
