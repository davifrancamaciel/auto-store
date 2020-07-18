import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import Container from '../../../components/Container'
import CompanyItem from './CompanyItem'

import api from '../../../services/api'
import history from '../../../services/browserhistory'
import getValidationErrors from '../../../Utils/getValidationErrors'

import { Main } from './styles'

const CompanyList = () => {
  const profile = useSelector(state => state.user.profile)

  if (!profile.company_provider) {
    toast.error('Usuário sem permissão para acessar lista de lojas.')
    history.push('/dashboard')
  }
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    async function loadCompanies () {
      try {
        const response = await api.get('companies', {
          params: {}
        })
        setCompanies(response.data)
        console.log(response.data)
      } catch (error) {
        getValidationErrors(error)       
      }
    }
    loadCompanies()
  }, [])

  async function handleDelete (id) {
    await api.delete(`companies/${id}`)

    toast.success('Loja excluída com sucesso!')
    const updateCompanies = companies.filter(c => c.id !== id)
    setCompanies(updateCompanies)
    
  }

  function handleUpdate(id) {
    history.push(`/company/edit/${id}`)
  }

  return (
    <Container title='Lojas'>
      <Link to='/company/create'>Cadastrar</Link>
      <Main>
        <ul>
          {companies.map(company => (
            <CompanyItem
              company={company}
              key={company.id}
              onUpdateClick={handleUpdate}
              onDeleteClick={handleDelete}
            />
          ))}
        </ul>
      </Main>
    </Container>
  )
}

export default CompanyList
