import styled from 'styled-components'

export const Container = styled.span`
  color: ${({ damage }) => (damage ? 'var(--danger-color)' : 'var(--primary-color)')};
`