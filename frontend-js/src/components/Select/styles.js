import styled from 'styled-components'

import Select from 'react-select'

export const SelectCustom = styled(Select)`
  .react-select__control--is-focused {
    > .react-select__value-container {
      > .react-select__placeholder {
        margin-top: 16px;
        top:51%;
      }
    }
  }
  .react-select__control {
    margin-top: 8px;
    border: 0;

    > .react-select__value-container {
      background: #f0f0f5;
      height: 44px;
      border-bottom-left-radius: 4px;
      border-top-left-radius: 4px;
      padding: 13px 15px;
      > .react-select__single-value {
        color: #6c6c80;
        // top: 39px;
        margin-top: 16px;
      }
      > .react-select__placeholder {
        color: #6c6c80;
         margin-top: 16px;
         top:6px;
      }
    }
    > .react-select__indicators {
      background: #f0f0f5;
      border-bottom-right-radius: 4px;
      border-top-right-radius: 4px;
    }
  }
`

export const Container = styled.div``
