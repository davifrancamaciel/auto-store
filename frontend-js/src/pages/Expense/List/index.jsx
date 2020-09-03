import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'
import { parseISO, format } from 'date-fns'
import pt from 'date-fns/locale/pt'

import Container from '../../../components/_layouts/Container'
import ShowConfirm from '../../../components/ShowConfirm'
import NoData from '../../../components/NoData'
import LoadMore from '../../../components/LoadMore'
import Order from '../../../components/Order'

import ListItem from './ListItem'
import Search from './Search'

import api from '../../../services/api'
import history from '../../../services/browserhistory'
import getValidationErrors from '../../../Utils/getValidationErrors'
import showToast from '../../../Utils/showToast'
import { formatPrice } from '../../../Utils/formatPrice'

import { Main, Ul } from '../../../components/_layouts/ListContainer/styles'

const orderByOptions = [
  { value: 'createdAt', label: 'Data de cadastro' },
  { value: 'value', label: 'Valor' }  
]

const ExpenseList = function () {
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState()
  const [noData, setNoData] = useState(false)
  const [expenses, setExpenses] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [onChangeOrder, setOnChangeOrder] = useState()

  useEffect(() => {
    async function loadExpenses () {
      try {
        setLoading(true)

        const response = await api.get('expenses', {
          params: { ...search, page, ...onChangeOrder }
        })

        const data = response.data.rows.map(expense => ({
          ...expense,
          valueFormated: formatPrice(expense.value),
          createdAtFormatedDate: `Cadastrada no dia ${format(
            parseISO(expense.createdAt),
            "d 'de' MMMM",
            { locale: pt }
          )}`
        }))

        if (page > 1) setExpenses([...expenses, ...data])
        else setExpenses(data)

        setTotal(response.data.count)
        setNoData(data.length == 0)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        getValidationErrors(error)
      }
    }

    loadExpenses()
  }, [search, page, onChangeOrder])

  async function handleDelete (item) {
    ShowConfirm(
      'Atenção',
      `Confirma a remoção da despesa ${item.type.name}?`,
      () => handleDeleteConfirm(item.id)
    )
  }

  async function handleDeleteConfirm (id) {
    try {
      setLoading(true)
      await api.delete(`expenses/${id}`)

      showToast.success('Despesa excluída com sucesso!')
      const updateExpenses = expenses.filter(c => c.id !== id)
      setTotal(total - 1)
      setExpenses(updateExpenses)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      getValidationErrors(error)
    }
  }

  function handleUpdate (id) {
    history.push(`/expense/edit/${id}`)
  }

  return (
    <Container
      title='Despesas'
      loading={loading ? Boolean(loading) : undefined}
    >
      <Search onSearch={setSearch} setPage={setPage} />
      <span>
        <span>{total > 0 && <span>Total {total}</span>}</span>
        <Link to='/expense/create'>
          <FiPlus size={20} /> Cadastrar
        </Link>
      </span>
      <Order onChangeOrder={setOnChangeOrder} orderOptions={orderByOptions} setPage={setPage} />
      {noData && <NoData text={`Não há dados para exibir :(`} />}
      <Main>
        <Ul>
          {expenses.map(expense => (
            <ListItem
              item={expense}
              key={expense.id}
              onUpdateClick={handleUpdate}
              onDeleteClick={handleDelete}
            />
          ))}
        </Ul>
      </Main>

      <LoadMore
        onClick={() => setPage(page + 1)}
        total={total}
        loadedItens={expenses.length}
      />
    </Container>
  )
}

export default ExpenseList
