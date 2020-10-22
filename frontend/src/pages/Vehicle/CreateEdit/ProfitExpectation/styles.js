import styled from 'styled-components'

export const Container = styled.div`
  text-align: center;
  color: #6c6c80;
  > p {
    margin-bottom: 10px;
    color: var(--secondary-color);
    font-weight: bold;
  }
  table {
    width: 100%;
    margin-bottom: 10px;
    tr {
      height: 20px;
    }
  }
`
export const Td = styled.td`
  color: ${({ damage }) => (damage ? 'var(--danger-color)' : 'var(--primary-color)')};
`
