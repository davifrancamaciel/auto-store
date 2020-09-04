import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AiOutlineShop, AiOutlineCar, AiFillDashboard } from 'react-icons/ai'
import { FaUsers, FaUsersCog } from 'react-icons/fa'
import { MdAttachMoney } from 'react-icons/md'

import Drawer from '../Drawer'
import ProfileMenu from './ProfileMenu'

import logo from '../../assets/icone.png'
import getImage from '../../Utils/getImage'
import { Container, Content, Profile } from './styles'

const itensMenu = [
  {
    path: 'dashboard',
    label: 'Dashboard',
    provider: 'false|true',
    icon: <AiFillDashboard size={26} size={26} />
  },
  {
    path: 'company',
    label: 'Lojas',
    provider: 'true',
    icon: <AiOutlineShop size={26} />
  },
  {
    path: 'client',
    label: 'Clientes',
    provider: 'false',
    icon: <FaUsers size={26} />
  },
  {
    path: 'vehicle',
    label: 'Veículos',
    provider: 'false',
    icon: <AiOutlineCar size={26} />
  },
  {
    path: 'user',
    label: 'Usuários',
    provider: 'false|true',
    icon: <FaUsersCog size={26} />
  },
  {
    path: 'expense',
    label: 'Despesas',
    provider: 'false',
    icon: <MdAttachMoney size={26} />
  }
]

const Header = () => {
  const [itensMenuUser, setItensMenuUser] = useState([])
  const profile = useSelector(state => state.user.profile)
  const profileFormated = {
    ...profile,
    name: profile.name.split(' ')[0],
    image: getImage(profile.image, profile.name)
  }

  useEffect(() => {
    setItensMenuUser(
      itensMenu.filter(i =>
        i.provider.includes(profile.company_provider.toString())
      )
    )
  }, [])

  return (
    <Container>
      <Content>
        <nav>
          <Link to='/dashboard' className={'as-items-menu'}>
            <img src={logo} alt='Gestão flex' />
          </Link>
          <Drawer itensMenuUser={itensMenuUser} />
          {itensMenuUser.map(i => (
            <Link key={i.label} to={`/${i.path}`} className={'as-items-menu'}>
              {i.label}
            </Link>
          ))}
        </nav>
        <aside>
          {/* <Notifications /> */}
          <Profile>
            <div>
              <strong>{profileFormated.name}</strong>
              {/* <Link to='/profile'>Meu perfil</Link> */}
              <ProfileMenu />
            </div>
            <img src={profileFormated.image} alt={profileFormated.name} />
          </Profile>
        </aside>
      </Content>
    </Container>
  )
}

export default Header
