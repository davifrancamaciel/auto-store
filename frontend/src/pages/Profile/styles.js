import styled from 'styled-components'
import { darken } from 'polished'

export const ProfileContainer = styled.div`
  .gf-dropzone {
    width: 200px;
    border-radius: 50%;
    margin: auto;
    > img {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      object-fit: cover;
    }
    > p {
      border: none;
    }
  }
  button {
    width: 260px;
  }
  @media (max-width: 720px) {
    button {
      width: 100%;
    }
  }
`

export const LogoutButton = styled.button`
  width: 100%;
  margin-top: 40px;
  transition: background-color 0.2s;
  cursor: pointer;
  margin: 10px 0 0;
  height: 44px;
  background: #3b9eff;
  font-weight: bold;
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 16px;
  transition: background 0.2s;
  align-self: flex-start;
  float: left;
  &:hover {
    background: ${darken(0.03, '#3b9eff')};
  }
`
