import styled from 'styled-components'

export const HeaderContainer = styled.section`
  background: linear-gradient(-90deg, rgb(47, 135, 191), #0db5bc);
  height: 250px;
  > div {
    width: 100%;
    max-width: 1120px;
    margin: 0 auto;
    padding: 40px 20px;
    > h1 {
      color: var(--secondary-color);
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

export const Card = styled.div`
  background: ${({ total }) => (total ? '#ff8d08' : '#fff')};
  padding: 22px 32px;
  border-radius: 2px;
  color: ${({ total }) => (total ? '#fff' : '#363F5F')};

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      font-size: 16px;
    }
  }

  h1 {
    margin-top: 14px;
    font-size: 36px;
    font-weight: normal;
    line-height: 54px;
  }
`
