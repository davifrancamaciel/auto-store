import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import api from '../../services/api'
import {
  AiOutlineShop,
  AiOutlineCar,
  AiOutlineUsergroupDelete
} from 'react-icons/ai'

import Container from '../../components/_layouts/Container'
import LineGraph from '../../components/LineGraph'
import SignatureControl from './SignatureControl'
import Card from './Card'

import { CardContainer, HeaderContainer, DashboardContainer } from './styles'
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
          <span>
            <h1>Dashboard</h1>
            {!profile.company_provider && (
              <Link to={`/company/edit/${profile.company_id}`}>
                Dados da minha loja
              </Link>
            )}
          </span>

          {!profile.company_provider && loaded && (
            <SignatureControl company={dashboard.company} />
          )}
        </div>
      </HeaderContainer>
      <Container>
        <DashboardContainer>
          <CardContainer>
            {profile.company_provider && (
              <Card
                route={'company'}
                loaded={loaded}
                item={dashboard.companies}
                title={'Lojas'}
                icon={<AiOutlineShop size={26} />}
                preposition='a'
              />
            )}
            <Card
              route={!profile.company_provider ? 'vehicle' : 'dashboard'}
              loaded={loaded}
              item={dashboard.vehicles}
              title={'Veículos'}
              icon={<AiOutlineCar size={26} />}
              preposition='o'
            />
            <Card
              route={!profile.company_provider ? 'client' : 'dashboard'}
              loaded={loaded}
              item={dashboard.clients}
              title={'Clientes'}
              icon={<AiOutlineUsergroupDelete size={26} />}
              preposition='o'
              total
            />
          </CardContainer>
          <LineGraph className="app_graph" casesType={"cases"} />
        </DashboardContainer>
      </Container>
    </>
  )
}

export default Dashboard
