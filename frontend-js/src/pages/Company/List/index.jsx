import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Container from '../../../components/Container'
import ShowConfirm from '../../../components/ShowConfirm'

import CompanyItem from './CompanyItem'

import api from '../../../services/api'
import history from '../../../services/browserhistory'
import getValidationErrors from '../../../Utils/getValidationErrors'
import getImage from '../../../Utils/getImage'
import showToast from '../../../Utils/showToast'

import { Main } from './styles'

const CompanyList = () => {
  const profile = useSelector(state => state.user.profile)

  const [companies, setCompanies] = useState([])

  useEffect(() => {
    async function loadCompanies () {
      try {
        const response = await api.get('companies', {
          params: {}
        })
        const comaniesFormated = response.data.map(company => ({
          ...company,
          image: getImage(company.image, company.name)
        }))
        setCompanies(comaniesFormated)
        console.log(comaniesFormated)
      } catch (error) {
        getValidationErrors(error)
      }
    }

    if (!profile.company_provider) {
      history.push('/dashboard')
      showToast.error('Usuário sem permissão para acessar lista de lojas.')
    }

    loadCompanies()
  }, [])

  async function handleDelete (item) {
    ShowConfirm('Atenção', `Confirma a remoção da loja ${item.name}?`, () => {
      handleDeleteConfirm(item.id)
    })
  }

  async function handleDeleteConfirm (id) {
    try {
      await api.delete(`companies/${id}`)

      showToast.success('Loja excluída com sucesso!')
      const updateCompanies = companies.filter(c => c.id !== id)
      setCompanies(updateCompanies)
    } catch (error) {
      showToast.error(
        'Verfique se a loja ainda está vinculada a usuarios, clientes, despesas e etc... '
      )
      getValidationErrors(error)
    }
  }

  function handleUpdate (id) {
    history.push(`/company/edit/${id}`)
  }

  return (
    <Container title='Lojas'>
      <Link to='/company/create'>Cadastrar</Link>
      <Main>
        <ul>
          {companies.map(company => (
            <CompanyItem
              item={company}
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
