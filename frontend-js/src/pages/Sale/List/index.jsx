import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
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
  { value: 'sale_date', label: 'Data da venda' },
  { value: 'value', label: 'Valor' },
]

const SaleList = function () {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState()
  const [noData, setNoData] = useState(false)
  const [sales, setSales] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [onChangeOrder, setOnChangeOrder] = useState()

  useEffect(() => {
    async function loadSales () {
      try {
        setLoading(true)

        const vehicle_id = id

        const response = await api.get('sales', {
          params: { ...search, page, ...onChangeOrder, vehicle_id }
        })

        const data = response.data.rows.map(sale => {
          const totalVaule =
            Number(sale.financed_value) +
            Number(sale.input_value) +
            Number(sale.vehicle_input_value)

          return {
            ...sale,
            valueFormated: formatPrice(sale.value),
            saleDateFormated: sale.sale_date
              ? `Realizada no dia ${format(
                  parseISO(sale.sale_date),
                  "d 'de' MMMM",
                  { locale: pt }
                )}`
              : '',
            createdAtFormated: `Cadastrada no dia ${format(
              parseISO(sale.createdAt),
              "d 'de' MMMM",
              { locale: pt }
            )}`
          }
        })

        if (page > 1) setSales([...sales, ...data])
        else setSales(data)

        setTotal(response.data.count)
        setNoData(data.length == 0)
        setLoading(false)
      } catch (error) {        
        setLoading(false)
        getValidationErrors(error)
      }
    }

    loadSales()
  }, [search, page, onChangeOrder])

  async function handleDelete (item) {
    ShowConfirm(
      'Atenção',
      `Confirma a remoção da venda do veículo ${item.vehicle.model}?`,
      () => handleDeleteConfirm(item.id)
    )
  }

  async function handleDeleteConfirm (id) {
    try {
      setLoading(true)
      await api.delete(`sales/${id}`)

      showToast.success('Venda excluída com sucesso!')
      const updateExpenses = sales.filter(c => c.id !== id)
      setTotal(total - 1)
      setSales(updateExpenses)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      getValidationErrors(error)
    }
  }

  function handleUpdate (id) {
    history.push(`/sale/edit/${id}`)
  }

  return (
    <Container title='Vendas' loading={loading ? Boolean(loading) : undefined}>
      <Search onSearch={setSearch} setPage={setPage} />
      <span>
        <span>{total > 0 && <span>Total {total}</span>}</span>
        <Link to='/sale/create'>
          <FiPlus size={20} /> Cadastrar
        </Link>
      </span>
      <Order
        onChangeOrder={setOnChangeOrder}
        orderOptions={orderByOptions}
        setPage={setPage}
      />
      {noData && <NoData text={`Não há dados para exibir :(`} />}
      <Main>
        <Ul>
          {sales.map(expense => (
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
        loadedItens={sales.length}
      />
    </Container>
  )
}

export default SaleList
