import React, { useState } from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Link from '@material-ui/core/Link'
import { useDispatch, useSelector } from 'react-redux'

import { signOut } from '../../../store/modules/auth/actions'
import history from '../../../services/browserhistory'

export default function SimpleMenu () {
  const profile = useSelector(state => state.user.profile)
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = option => {
    setAnchorEl(null)
    switch (option) {
      case 'profile':
        history.push(`/profile`)
        break
      case 'logout':
        dispatch(signOut())
        break
      case 'company':
        history.push(`/company/edit/${profile.company_id}`)
        break

      default:
        break
    }
  }

  return (
    <div>
      <Link
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleClick}
      >
        Meu perfil
      </Link>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => handleClose('')}
      >
        <MenuItem onClick={() => handleClose('profile')}>Minha conta</MenuItem>
        {!profile.company_provider && (
          <MenuItem onClick={() => handleClose('company')}>Minha Loja</MenuItem>
        )}
        <MenuItem onClick={() => handleClose('logout')}>Sair</MenuItem>
      </Menu>
    </div>
  )
}
