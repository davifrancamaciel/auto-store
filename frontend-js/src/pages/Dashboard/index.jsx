import React from 'react'
import { Link } from 'react-router-dom'

import Container from '../../components/Container'

import { CardContainer, Card } from './styles'

const Dashboard = () => {
  
  return (
    <Container title='Dashboard'>
      <CardContainer>
        <Link to='/company'>
          <Card>
            <header>
              <p>Lojas</p>
              {/* <img src={''} alt='Lojas' /> */}
            </header>
            <h1 data-testid='balance-income'>{10}</h1>
          </Card>
        </Link>
        <Card>
          <header>
            <p>Saídas</p>
            {/* <img src={''} alt='Saídas' /> */}
          </header>
          <h1 data-testid='balance-outcome'>{2}</h1>
        </Card>
        <Card total>
          <header>
            <p>Total</p>
            {/* <img src={''} alt='Total' /> */}
          </header>
          <h1 data-testid='balance-total'>{12}</h1>
        </Card>
      </CardContainer>
    </Container>
  )
}

export default Dashboard
