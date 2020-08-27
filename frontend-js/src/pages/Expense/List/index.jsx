import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'
import { parseISO, formatDistance } from 'date-fns'
import pt from 'date-fns/locale/pt'

import Container from '../../../components/Container'
import ShowConfirm from '../../../components/ShowConfirm'
import NoData from '../../../components/NoData'
import LoadMore from '../../../components/LoadMore'

// import ListItem from './ListItem'
import Search from './Search'

import api from '../../../services/api'
import history from '../../../services/browserhistory'
import getValidationErrors from '../../../Utils/getValidationErrors'
import getImage from '../../../Utils/getImage'
import showToast from '../../../Utils/showToast'
import { formatPrice } from '../../../Utils/formatPrice'

import { Main, Ul } from '../../../components/ListContainer/styles'

const ExpenseList = function () {
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState()
  const [noData, setNoData] = useState(false)
  const [expenses, setExpenses] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)


  useEffect(() => {
    async function loadExpenses () {
      try {
        setLoading(true)

        const response = await api.get('expenses', {
          params: { ...search, page }
        })

        const data = response.data.rows.map(expense => ({
          ...expense,
          priceFormated: formatPrice(expense.value),
          createdAtFormated: `Cadastrado ${formatDistance(
            parseISO(expense.createdAt),
            new Date(),
            { addSuffix: true, locale: pt }
          )}`
        }))

        if (page > 1) setExpenses([...expenses, ...data])
        else setExpenses(data)

        setTotal(response.data.count)
        console.log(response.data)
        setNoData(response.data.length == 0)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        getValidationErrors(error)
      }
    }

    loadExpenses()
  }, [search, page])

  async function handleDelete (item) {
    ShowConfirm('Atenção', `Confirma a remoção da despesa ${item.id}?`, () =>
      handleDeleteConfirm(item.id)
    )
  }

  async function handleDeleteConfirm (id) {
    try {
      setLoading(true)
      await api.delete(`expenses/${id}`)

      showToast.success('Despesa excluído com sucesso!')
      const updateExpenses = expenses.filter(c => c.id !== id)
      setExpenses(updateExpenses)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      getValidationErrors(error)
    }
  }

  function handleUpdate (id) {
    history.push(`/vehicle/edit/${id}`)
  }


  return (
    <Container
      title='Despesas'
      loading={loading ? Boolean(loading) : undefined}
    >
      <Search onSearch={setSearch} setPage={setPage} />
      <span>
        <Link to='/expense/create'>
          <FiPlus size={20} /> Cadastrar
        </Link>
      </span>
      <Main>
        <Ul>
          {expenses.map(expense => (
            // <ListItem
            //   item={expense}
            //   key={expense.id}
            //   onUpdateClick={handleUpdate}
            //   onDeleteClick={handleDelete}
            // />
            <li>{expense.description}</li>
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
