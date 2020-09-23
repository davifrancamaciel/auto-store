import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import api from '../../services/api'

import Container from '../../components/_layouts/Container'
import SignatureControl from './SignatureControl'
import CardContainer from './CardContainer'
import ExpenseLineGraph from './ExpenseLineGraph'

import { HeaderContainer, DashboardContainer } from './styles'
import getValidationErrors from '../../Utils/getValidationErrors'


const Dashboard = () => {
  const profile = useSelector(state => state.user.profile)
  const [dashboard, setDashboard] = useState({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
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
          <span>
            <h1>Dashboard</h1>
          </span>

          {!profile.company_provider && loaded && (
            <SignatureControl company={dashboard.company} />
          )}
        </div>
      </HeaderContainer>
      <Container>
        <DashboardContainer>
          <CardContainer
            company_provider={profile.company_provider}
            dashboard={dashboard}
            loaded={loaded}
          />

          <ExpenseLineGraph className='expense-graph'/>
          

        </DashboardContainer>
      </Container>
    </>
  )
}

export default Dashboard
