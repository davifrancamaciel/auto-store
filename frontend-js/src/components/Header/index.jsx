import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import logo from '../../assets/icone.png'
import getImage from '../../Utils/getImage'
import { Container, Content, Profile } from './styles'
import history from '../../services/browserhistory'

const itensMenu = [
  { path: 'dashboard', label: 'Dashboard', provider: 'false|true' },
  { path: 'company', label: 'Lojas', provider: 'true' },
  { path: 'client', label: 'Clientes', provider: 'false|true' },
  { path: 'vehicle', label: 'Veículos', provider: 'false' },
  { path: 'user', label: 'Usuários', provider: 'false|true' },
]

const Header = () => {
  const { path } = history.location
  const [itensMenuUser, setItensMenuUser] = useState([])
  const profile = useSelector(state => state.user.profile)
  const profileFormated = {
    ...profile,
    name: profile.name.split(' ')[0],
    image: getImage(profile.image, profile.name)
  }

  useEffect(() => {
    setItensMenuUser(
      itensMenu.filter(i => i.provider.includes(profile.company_provider.toString()))
    )
  }, [])

  // useEffect(() => {
  //   console.log(path)
  // }, [path])

  // console.log(profile)
  return (
    <Container>
      <Content>
        <nav>
          <Link to='/dashboard'>
            <img src={logo} alt='Gestão flex' />
          </Link>
          {itensMenuUser.map(i => (
            <Link key={i.label} to={`/${i.path}`} className={''}>
              {i.label}
            </Link>
          ))}
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
