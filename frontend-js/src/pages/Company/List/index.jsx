import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'

import Container from '../../../components/Container'
import ShowConfirm from '../../../components/ShowConfirm'

import CompanyItem from './ListItem'
import Search from './Search'

import api from '../../../services/api'
import history from '../../../services/browserhistory'
import getValidationErrors from '../../../Utils/getValidationErrors'
import getImage from '../../../Utils/getImage'
import showToast from '../../../Utils/showToast'

import { Main, Ul } from '../../../components/ListContainer/styles'

const CompanyList = () => {
  const profile = useSelector(state => state.user.profile)

  const [companies, setCompanies] = useState([])
  const [search, setSearch] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function loadCompanies () {
      try {
        setLoading(true)
        const response = await api.get('companies', {
          params: {
            ...search
          }
        })
        const comaniesFormated = response.data.map(company => ({
          ...company,
          image: getImage(company.image, company.name)
        }))
        setCompanies(comaniesFormated)
        console.log(comaniesFormated)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        getValidationErrors(error)
      }
    }

    if (!profile.company_provider) {
      history.push('/dashboard')
      showToast.error('Usuário sem permissão para acessar lista de lojas.')
    }

    loadCompanies()
  }, [search])

  async function handleDelete (item) {
    ShowConfirm('Atenção', `Confirma a remoção da loja ${item.name}?`, () => {
      handleDeleteConfirm(item.id)
    })
  }

  async function handleDeleteConfirm (id) {
    try {
      setLoading(true)
      await api.delete(`companies/${id}`)

      showToast.success('Loja excluída com sucesso!')
      const updateCompanies = companies.filter(c => c.id !== id)
      setCompanies(updateCompanies)
      setLoading(false)
    } catch (error) {
      setLoading(false)
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
    <Container title='Lojas' loading={loading ? Boolean(loading) : undefined}>
      <Search onSearch={setSearch} />
      <span>
        <Link to='/company/create'>
          <FiPlus size={20} /> Cadastrar
        </Link>
      </span>
      <Main>
        <Ul>
          {companies.map(company => (
            <CompanyItem
              item={company}
              key={company.id}
              onUpdateClick={handleUpdate}
              onDeleteClick={handleDelete}
            />
          ))}
        </Ul>
      </Main>
    </Container>
  )
}

export default CompanyList
