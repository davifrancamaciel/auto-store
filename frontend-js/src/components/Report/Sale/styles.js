import styled from 'styled-components'

export const Container = styled.div``
export const Page = styled.div`
  background-color: #fff;
  padding: 40px;
  color: #333;
  width: 770px;

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

      table {
        border-collapse: collapse;
        tr {
          height: 20px;
          th:last-child {
            width: 100px;
          }
        }
        td {
          border: 1px solid #333;
        }
      }
    }
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
