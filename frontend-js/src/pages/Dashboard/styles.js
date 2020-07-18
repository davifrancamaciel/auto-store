import styled from 'styled-components';

export const CardContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;
//   margin-top: -150px;
`;

export const Card = styled.div`
  background: ${({ total }) => (total ? '#ff8d08' : '#fff')};
  padding: 22px 32px;
  border-radius: 5px;
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
`;