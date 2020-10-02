import styled from 'styled-components'

export const Container = styled.div`
  //   background: #fff;
  background: linear-gradient(-90deg, rgb(47, 135, 191), #0db5bc);
  padding: 0 30px;
`
export const Content = styled.div`
  height: 64px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      height: 40px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }

    a {
      font-weight: bold;
      color: #fff;
      margin-right: 15px;
      cursor: pointer;
      &:hover {
        text-decoration: none;
      }
    }
    a.active {
      color: var(--secondary-color);
    }
  }
  aside {
    display: flex;
    align-items: center;
  }

  .as-btn-menu {
    display: none;
  }
  @media (max-width: 863px) {
    .as-btn-menu {
      display: initial;
    }
    .as-items-menu {
      display: none;
    }
  }
`
export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #333;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #fff;
      cursor: pointer;
      &:hover {
        text-decoration: none;
      }
    }
  }
  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }

  .MuiPaper-rounded {
    border-radius: 2px;
  }
`
