import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import logo from '../../assets/icone.png'
import getImage from '../../Utils/getImage'
import { Container, Content, Profile } from './styles'

const Header = () => {
  const profile = useSelector(state => state.user.profile)
  const profileFormated = {
    ...profile,
    image: getImage(profile.image, profile.name)
  }
  console.log(profile)
  return (
    <Container>
      <Content>
        <nav>
          <Link to='/dashboard'>
            <img src={logo} alt='Gestão flex' />
          </Link>
        </nav>
        <aside>
          {/* <Notifications /> */}
          <Profile>
            <div>
              <strong>{profileFormated.name}</strong>
              <Link to='/profile'>Meu perfil</Link>
            </div>
            <img src={profileFormated.image} alt={profileFormated.name} />
          </Profile>
        </aside>
      </Content>
    </Container>
  )
}

export default Header
