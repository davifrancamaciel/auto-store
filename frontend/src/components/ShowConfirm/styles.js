import styled from 'styled-components'

export const Container = styled.div`
    border-radius: 4px;
    text-align: center;
    width: 500px;
    padding: 40px;
    background: var(--primary-color);
    box-shadow: 0 20px 75px rgba(0, 0, 0, 0.23);
    color: #fff;
  
  
  > h1 {
    margin-top: 0;    
  }
  
  > button {
    border-radius: 4px;
    width: 160px;
    padding: 10px;
    border: 1px solid #fff;
    margin: 10px;
    cursor: pointer;
    background: none;
    color: #fff;
    font-size: 14px;
  }
  `