import styled from 'styled-components'
import { lighten } from 'polished'

export const Container = styled.span`
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
`
