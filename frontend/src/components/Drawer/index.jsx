import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import { MdExpandLess, MdExpandMore, MdKeyboardArrowLeft } from 'react-icons/md'

import Collapse from '@material-ui/core/Collapse'
import { FiMenu } from 'react-icons/fi'
import history from '../../services/browserhistory'

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
})

export default function TemporaryDrawer ({ itensMenuUser }) {
  const profile = useSelector(state => state.user.profile)

  const classes = useStyles()
  const [open, setOpen] = useState(true)
  const [openContracts, setOpenContracts] = useState(false)

  const handleContractsClick = () => {
    setOpenContracts(!openContracts)
  }

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  })

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
    setOpenContracts(false)
  }

  const list = anchor => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom'
      })}
      role='presentation'
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <List
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        {itensMenuUser.map((i, index) => (
          <ListItem
            button
            key={i.label}
            onClick={() => history.push(`/${i.path}`)}
          >
            <ListItemIcon>{i.icon}</ListItemIcon>
            <ListItemText primary={i.label} />
          </ListItem>
        ))}
      </List>
      <Divider />
      {!profile.company_provider && (
        <List>
          <ListItem button onClick={handleContractsClick}>
            {/* <ListItemIcon>
            <InboxIcon />
          </ListItemIcon> */}
            <ListItemText primary='Contratos' />
            {openContracts ? (
              <MdExpandLess size={26} />
            ) : (
              <MdExpandMore size={26} />
            )}
          </ListItem>
          <Collapse in={openContracts} timeout='auto' unmountOnExit>
            <List
              component='div'
              disablePadding
              onClick={toggleDrawer(anchor, false)}
              onKeyDown={toggleDrawer(anchor, false)}
            >
              <ListItem
                button
                className={classes.nested}
                onClick={() => history.push(`/sale`)}
              >
                {/* <ListItemIcon></ListItemIcon> */}
                <ListItemText primary='Vendas' />
              </ListItem>
            </List>
          </Collapse>
        </List>
      )}
    </div>
  )

  return (
    <div>
      <React.Fragment>
        <Button className={'as-btn-menu'} onClick={toggleDrawer('left', true)}>
          <FiMenu color={'#fff'} size={26} />
        </Button>
        <Drawer
          anchor={'left'}
          open={state['left']}
          onClose={toggleDrawer('left', false)}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={toggleDrawer('left', false)}>
              <MdKeyboardArrowLeft color={'var(--text-color)'} size={26} />
            </IconButton>
          </div>
          <Divider />
          {list('left')}
        </Drawer>
      </React.Fragment>
    </div>
  )
}
