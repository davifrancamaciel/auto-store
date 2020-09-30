import styled from 'styled-components'

export const InfoDays = styled.span`
  color: ${({ expireWarning }) => (expireWarning ? '#ff8d08' : '#fff')};
`
