import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { parseISO, formatDistance } from 'date-fns'
import pt from 'date-fns/locale/pt'
import api from '../../services/api'

import Container from '../../components/Container'

import { CardContainer, Card } from './styles'
import getValidationErrors from '../../Utils/getValidationErrors'

const Dashboard = () => {
  const [dashboard, setDashboard] = useState({})

  useEffect(() => {
    async function loadDashboard () {
      try {
        const response = await api.get('dashboard')
        const model = response.data

        const dashboardFormated = {
          ...model,
          company: {
            expires_at: `Expira ${formatDistance(
              parseISO(model.company.expires_at),
              new Date(),
              {
                addSuffix: true,
                locale: pt
              }
            )}`
          }
        }
        setDashboard(dashboardFormated)

        console.log(dashboardFormated)
      } catch (error) {
        getValidationErrors(error)
      }
    }

    loadDashboard()
  }, [])

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
