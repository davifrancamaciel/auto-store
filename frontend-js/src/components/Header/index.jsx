import React from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { AVATAR_DEFAULT } from '../../constants/user'
import logo from '../../assets/icone.png'

import { Container, Content, Profile } from './styles'

const Header = () => {
    const profile = useSelector(state => state.user.profile)
    console.log(profile)
    return (
      <Container>
        <Content>
          <nav>
            <img src={logo} alt='Gestão flex' />
            <Link to='/dashboard'>DASHBOARD</Link>
          </nav>
          <aside>
            {/* <Notifications /> */}
            <Profile>
              <div>
                <strong>{profile.name}</strong>
                <Link to='/profile'>Meu perfil</Link>
              </div>
              <img
                src={profile.avatar ? profile.avatar.url : AVATAR_DEFAULT}
                alt={profile.name}
              />
            </Profile>
          </aside>
        </Content>
      </Container>
    )
}

export default Header;