import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'

import Container from '../../../components/Container'
import ShowConfirm from '../../../components/ShowConfirm'

import api from '../../../services/api'
import history from '../../../services/browserhistory'
import getValidationErrors from '../../../Utils/getValidationErrors'
import getImage from '../../../Utils/getImage'
import showToast from '../../../Utils/showToast'
import UserItem from './ListItem'
import Search from './Search'

import { Main, Ul } from '../../../components/ListContainer/styles'

const UserList = ({ provider }) => {
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState()
  const [users, setUsers] = useState([])

  useEffect(() => {
    console.log(provider)
    async function loadUsers () {
      try {
        setLoading(true)
        const response = await api.get('users', {
          params: {
            ...search,
            provider,
            provider_company: false
          }
        })
        const usersFormated = response.data.map(user => ({
          ...user,
          image: getImage(user.image, user.name)
        }))
        setUsers(usersFormated)
        console.log(usersFormated)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        getValidationErrors(error)
      }
    }

    loadUsers()
  }, [provider, search])

  async function handleDelete (item) {
    ShowConfirm('Atenção', `Confirma a remoção da loja ${item.name}?`, () => {
      handleDeleteConfirm(item.id)
    })
  }

  async function handleDeleteConfirm (id) {
    try {
      setLoading(true)
      await api.delete(`users/${id}`)

      showToast.success('Loja excluída com sucesso!')
      const updateUsers = users.filter(c => c.id !== id)
      setUsers(updateUsers)
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
    history.push(`/${provider ? 'user' : 'client'}/edit/${id}`)
  }

  return (
    <Container
      title={provider ? 'Usuários do sistema' : 'Clientes'}
      loading={loading}
    >
      <Search onSearch={setSearch} provider={provider} />
      <span>
        <Link to={`/${provider ? 'user' : 'client'}/create`}>
          <FiPlus size={20} /> Cadastrar
        </Link>
      </span>
      <Main>
        <Ul>
          {users.map(users => (
            <UserItem
              item={users}
              key={users.id}
              onUpdateClick={handleUpdate}
              onDeleteClick={handleDelete}
            />
          ))}
        </Ul>
      </Main>
    </Container>
  )
}

export default UserList
