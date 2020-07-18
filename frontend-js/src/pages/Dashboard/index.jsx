import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { signOut } from '../../store/modules/auth/actions'

import Container from '../../components/Container'

import { CardContainer, Card } from './styles'

const Dashboard = () => {
  const dispatch = useDispatch()

  function handleSignOut () {
    dispatch(signOut())
  }
  return (
    <Container title='Dashboard'>
      <button onClick={handleSignOut} type='button'>
        Sair
      </button>

      <CardContainer>
        <Link to='/company'>
          <Card>
            <header>
              <p>Lojas</p>
              <img src={''} alt='Lojas' />
            </header>
            <h1 data-testid='balance-income'>{10}</h1>
          </Card>
        </Link>
        <Card>
          <header>
            <p>Saídas</p>
            <img src={''} alt='Saídas' />
          </header>
          <h1 data-testid='balance-outcome'>{2}</h1>
        </Card>
        <Card total>
          <header>
            <p>Total</p>
            <img src={''} alt='Total' />
          </header>
          <h1 data-testid='balance-total'>{12}</h1>
        </Card>
      </CardContainer>
    </Container>
  )
}

export default Dashboard
