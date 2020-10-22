import styled from 'styled-components'

export const Container = styled.div`
  background: #fff;
  box-shadow: 0 0 14px 0 #00000033;
  border-radius: 2px;
  padding: 20px;
  margin-bottom: 20px;

  display: flex;
  flex-direction: column;

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

  .field-group .field + .field {
    margin-left: 24px;
  }
  .field-group input + input {
    margin-left: 24px;
  }
  button {
    margin-top: 24px;
  }
  
  @media (max-width: 720px) {
    .field-group .field + .field {
      margin-left: 0px;
    }
    .field-group {
      display: block;
    }
  }
`
