import React from 'react'
import { Switch } from 'react-router-dom'
import Route from './Route'

import SignUp from '../pages/SignUp'
import SignIn from '../pages/SignIn'
import Dashboard from '../pages/Dashboard'
import CompanyList from '../pages/Company/List'
import CompanyCreateEdit from '../pages/Company/CreateEdit'
import UserList from '../pages/User/List'
import Profile from '../pages/Profile'
// import UserCreateEdit from '../pages/User/CreateEdit'


const Routes = () => {
  return (    
      <Switch>      
        <Route path='/' exact component={SignIn} />
        <Route path='/register' exact component={SignUp} />
        <Route path='/dashboard' exact component={Dashboard} isPrivate />        
        <Route path='/user' exact component={UserList} isPrivate />        
        <Route path='/company' exact component={CompanyList} isPrivate />        
        <Route path='/company/create' component={CompanyCreateEdit} isPrivate />        
        <Route path='/company/edit/:id' component={CompanyCreateEdit} isPrivate />    
        <Route path='/profile' component={Profile} isPrivate />    
        
      </Switch>    
  )
}

export default Routes
