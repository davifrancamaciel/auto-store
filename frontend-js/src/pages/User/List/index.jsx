import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'

import Container from '../../../components/_layouts/Container'
import ShowConfirm from '../../../components/ShowConfirm'
import NoData from '../../../components/NoData'
import LoadMore from '../../../components/LoadMore'
import Order from '../../../components/Order'

import api from '../../../services/api'
import history from '../../../services/browserhistory'
import getValidationErrors from '../../../Utils/getValidationErrors'
import getImage from '../../../Utils/getImage'
import showToast from '../../../Utils/showToast'
import ListItem from './ListItem'
import Search from './Search'

import { Main, Ul } from '../../../components/_layouts/ListContainer/styles'

const orderByOptionsUser = [{ value: 'name', label: 'Nome' }]
const orderByOptionsClient = [
  { value: 'name', label: 'Nome' },
  { value: 'city', label: 'Cidade' },
  { value: 'neighborhood', label: 'Bairro' }
]

const UserList = ({ provider }) => {
  const profile = useSelector(state => state.user.profile)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState()
  const [users, setUsers] = useState([])
  const [noData, setNoData] = useState(false)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [onChangeOrder, setOnChangeOrder] = useState()

  useEffect(() => {
    setUsers([])
    async function loadUsers () {
      try {
        setLoading(true)
        const response = await api.get('users', {
          params: {
            ...search,
            provider,
            provider_company: false,
            page,
            ...onChangeOrder
          }
        })
        const usersFormated = response.data.rows.map(user => ({
          ...user,
          image: getImage(user.image, user.name)
        }))

        if (page > 1) setUsers([...users, ...usersFormated])
        else {
          setUsers(usersFormated)
        }
        setNoData(response.data.rows.length == 0)
        setTotal(response.data.count)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        getValidationErrors(error)
      }
    }

    loadUsers()
  }, [provider, search, page, onChangeOrder])

  async function handleDelete (item) {
    ShowConfirm(
      'Atenção',
      `Confirma a remoção do ${provider ? 'usuário' : 'cliente'} ${item.name}?`,
      () => handleDeleteConfirm(item.id)
    )
  }

  async function handleDeleteConfirm (id) {
    try {
      setLoading(true)
      await api.delete(`users/${id}`)

      showToast.success(
        `${provider ? 'Usuário' : 'Cliente'} excluído com sucesso!`
      )
      const updateUsers = users.filter(c => c.id !== id)
      setUsers(updateUsers)
      setTotal(total - 1)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      getValidationErrors(error)
    }
  }

  function handleUpdate (id) {
    if (profile.id === id) {
      history.push(`/profile`)
    } else {
      history.push(`/${provider ? 'user' : 'client'}/edit/${id}`)
    }
  }

  return (
    <Container
      title={provider ? 'Usuários do sistema' : 'Clientes'}
      loading={loading}
    >
      <Search onSearch={setSearch} provider={provider} setPage={setPage} />
      <span>
        <span>{total > 0 && <span>Total {total}</span>}</span>
        <Link to={`/${provider ? 'user' : 'client'}/create`}>
          <FiPlus size={20} /> Cadastrar
        </Link>
      </span>

      <Order
        onChangeOrder={setOnChangeOrder}
        orderOptions={provider ? orderByOptionsUser : orderByOptionsClient}
        setPage={setPage}
        provider={provider}
      />

      {noData && <NoData text={`Não há dados para exibir :(`} />}
      <Main>
        <Ul>
          {users.map(users => (
            <ListItem
              provider={provider}
              item={users}
              key={users.id}
              onUpdateClick={handleUpdate}
              onDeleteClick={handleDelete}
            />
          ))}
        </Ul>
      </Main>
      <LoadMore
        onClick={() => setPage(page + 1)}
        total={total}
        loadedItens={users.length}
      />
    </Container>
  )
}

export default UserList
