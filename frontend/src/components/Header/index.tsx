import React from 'react';

import logo from '../../assets/icone.png'

import { Container, Content, Profile } from './styles'

const Header: React.FC = () => {
  return (
      <Container>
          <Content>
              <nav>
                  <img src={logo} alt="Gestão flex"/>
              </nav>
          </Content>
      </Container>
  );
}

export default Header;