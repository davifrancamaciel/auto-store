import React from 'react'

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

import ListSubheader from '@material-ui/core/ListSubheader'

import Collapse from '@material-ui/core/Collapse'
import { FiMenu } from 'react-icons/fi'
import history from '../../services/browserhistory'

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  }
})

export default function TemporaryDrawer ({ itensMenuUser }) {
  const classes = useStyles()
  const [state, setState] = React.useState({
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
  }

  const list = anchor => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom'
      })}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
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
    </div>
  )

  const [open, setOpen] = React.useState(true)

  const handleClick = () => {
    setOpen(!open)
  }
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
          <div className={''}>
            <IconButton onClick={toggleDrawer('left', true)}>
              <FiMenu color={'#fff'} size={26} />
            </IconButton>
          </div>
          <Divider />
          {list('left')}
        </Drawer>
      </React.Fragment>
    </div>
  )
}
