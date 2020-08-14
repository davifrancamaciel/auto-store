import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import api from '../../services/api'

import Container from '../../components/Container'
import SignatureControl from './SignatureControl'

import {
  CardContainer,
  Card,
  HeaderContainer,
  DashboardContainer
} from './styles'
import getValidationErrors from '../../Utils/getValidationErrors'

const Dashboard = () => {
  const profile = useSelector(state => state.user.profile)
  const [dashboard, setDashboard] = useState({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    console.log(profile)
    async function loadDashboard () {
      try {
        const response = await api.get('dashboard')
        setDashboard(response.data)
        setLoaded(true)
      } catch (error) {
        getValidationErrors(error)
      }
    }
    loadDashboard()
  }, [])

  return (
    <>
      <HeaderContainer>
        <div>
          <h1>Dashboard</h1>
          {!profile.company_provider && loaded && (
            <SignatureControl company={dashboard.company} />
          )}
        </div>
      </HeaderContainer>
      <Container>
        <DashboardContainer>
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
        </DashboardContainer>
      </Container>
    </>
  )
}

export default Dashboard
