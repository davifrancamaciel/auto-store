import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { signOut } from '../../store/modules/auth/actions'
// import { Container } from './styles';

const Dashboard: React.FC = () => {

  const dispatch = useDispatch()
  
  function handleSignOut () {
    dispatch(signOut())
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleSignOut} type='button'>
        Sair 
      </button>
    </div>
  )
}

export default Dashboard
