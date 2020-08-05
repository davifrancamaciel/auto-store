import React from 'react'
import { Switch, Redirect } from 'react-router-dom'
import Route from './Route'

import SignUp from '../pages/SignUp'
import SignIn from '../pages/SignIn'
import Dashboard from '../pages/Dashboard'
import CompanyList from '../pages/Company/List'
import CompanyCreateEdit from '../pages/Company/CreateEdit'
import UserList from '../pages/User/List'
import UserCreateEdit from '../pages/User/CreateEdit'
import Profile from '../pages/Profile'

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/' component={SignIn} />
      <Route exact path='/register' component={SignUp} />
      <Route exact path='/dashboard' component={Dashboard} isPrivate />
      <Route exact path='/company' component={CompanyList} isPrivate />
      <Route exact path='/company/create' component={CompanyCreateEdit} isPrivate />
      <Route exact path='/company/edit/:id' component={CompanyCreateEdit} isPrivate />
      <Route exact path='/user' component={UserList} isPrivate provider={true} />
      <Route exact path='/user/create' component={UserCreateEdit} isPrivate provider={true} />
      <Route exact path='/user/edit/:id' component={UserCreateEdit} isPrivate provider={true} />
      <Route exact path='/client' component={UserList} isPrivate provider={false} />
      <Route exact path='/client/create' component={UserCreateEdit} isPrivate provider={false} />
      <Route exact path='/client/edit/:id' component={UserCreateEdit} isPrivate provider={false} />
      <Route exact path='/profile' component={Profile} isPrivate />
      <Redirect from='*' to='/' />
    </Switch>
  )
}

export default Routes
