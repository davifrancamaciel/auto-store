import React from 'react'
// import { Route, BrowserRouter } from 'react-router-dom'
import { Switch } from 'react-router-dom'
import Route from './Route'

import SignUp from '../pages/SignUp'
import SignIn from '../pages/SignIn'
import Dashboard from '../pages/Dashboard'

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path='/' exact component={SignIn}  />
      <Route path='/register' component={SignUp} />
      <Route path='/dashboard' component={Dashboard} isPrivate />
    </Switch>
  )
}

export default Routes
