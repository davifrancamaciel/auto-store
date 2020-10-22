import styled from 'styled-components'

export const Container = styled.div`
  height: 200px;
  background: #f0f0f5;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  outline: 0;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }

  p {
    width: calc(100% - 60px);
    height: calc(100% - 60px);
    border-radius: 10px;
    border: 1px dashed var(--secondary-color);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--text-color);
  }

  p svg {
    color: var(--secondary-color);
    width: 24px;
    height: 24px;
    margin-bottom: 8px;
  }
`
