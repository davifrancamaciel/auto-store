import styled from 'styled-components'
import { lighten } from 'polished'

export const Container = styled.div`
  > header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;

    button {
      border: none;
      margin-bottom: 15px;
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
      }
      > svg {
        color: var(--secondary-color);
        margin-right: 16px;
      }
    }
  }
`
export const PdfContainer = styled.div`
  display: flex;
  justify-content: center;
  overflow-x: auto;
  @media (max-width: 800px) {
    display: block;
  }
`
export const Page = styled.div`
  background-color: #fff;
  padding: 40px;
  color: #333;
  width: 770px;
  min-width: 770px;
  p {
    font-size: 17px;
  }

  span {
    font-weight: bold;
    padding-left: 5px;
  }

  .as-client,
  .as-vehicle {
    margin-top: 10px;

    > h2 {
      text-align: center;
      margin-bottom: 10px;
    }
    > div {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      > div + div {
        margin-left: 10px;
      }
      div > {
        ul {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0px 10px;
          li {
            display: flex;
            width: 340px;
            justify-content: space-between;
            p {
              border: 1px solid #333;
              text-align: center;
              min-width: 170px;
              white-space: nowrap;
            }            
          }          
        }
      }      
    }
  }

  .as-footer {
    margin-top: 30px;
    > p {
      text-align: end;
    }
    > div {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      > div {
        width: 100%;
        hr {
          margin: 40px 10px 0;
        }
        p {
          text-align: center;
        }
      }
    }
  }

  @media all {
    .page-break {
      display: none;
    }
  }

  @media print {
    html,
    body {
      height: initial !important;
      overflow: initial !important;
      -webkit-print-color-adjust: exact;
    }
  }

  @media print {
    .page-break {
      margin-top: 1rem;
      display: block;
      page-break-before: auto;
    }
  }

  @page {
    size: auto;
    margin: 20mm 10mm;
  }
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;

  img {
    max-height: 100px;
  }

  > div {
    h1 {
      color: #333;
    }
    p {
      text-align: end;
    }
  }
`
