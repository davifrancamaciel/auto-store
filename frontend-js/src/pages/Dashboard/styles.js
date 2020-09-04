import styled from 'styled-components'

export const HeaderContainer = styled.section`
  background: linear-gradient(-90deg, rgb(47, 135, 191), #0db5bc);
  height: 250px;
  > div {
    width: 100%;
    max-width: 1120px;
    margin: 0 auto;
    padding: 40px 20px;

    > span {
      display: flex;
      justify-content: space-between;
      > h1 {
        color: var(--secondary-color);
      }      
    }

    > h2 {
      color: #fff;
      margin-top: 20px;
    }
  }
`
export const DashboardContainer = styled.section`
  margin-top: -120px;
`
export const CardContainer = styled.section`
  margin-bottom:40px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;
  @media (max-width: 780px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 530px) {
    grid-template-columns: repeat(1, 1fr);
  }
`
