import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'
import { parseISO, formatDistance } from 'date-fns'
import pt from 'date-fns/locale/pt'

import Container from '../../../components/_layouts/Container'
import ShowConfirm from '../../../components/ShowConfirm'
import NoData from '../../../components/NoData'
import LoadMore from '../../../components/LoadMore'

import ListItem from './ListItem'
import Search from './Search'

import api from '../../../services/api'
import history from '../../../services/browserhistory'
import getValidationErrors from '../../../Utils/getValidationErrors'
import getImage from '../../../Utils/getImage'
import showToast from '../../../Utils/showToast'
import { formatPrice } from '../../../Utils/formatPrice'

import { Main, Ul } from '../../../components/_layouts/ListContainer/styles'

const VehicleList = () => {
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState()
  const [noData, setNoData] = useState(false)
  const [vehicles, setVehicles] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)

  useEffect(() => {
    async function loadvehicles () {
      try {
        setLoading(true)

        const response = await api.get('vehicles', {
          params: { ...search, page }
        })

        const data = response.data.rows.map(vehicle => ({
          ...vehicle,
          priceFormated: formatPrice(vehicle.value),
          createdAtFormated: `Cadastrado ${formatDistance(
            parseISO(vehicle.createdAt),
            new Date(),
            { addSuffix: true, locale: pt }
          )}`
        }))

        if (page > 1) setVehicles([...vehicles, ...data])
        else setVehicles(data)

        setTotal(response.data.count)
        console.log(response.data)
        setNoData(response.data.length == 0)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        getValidationErrors(error)
      }
    }

    loadvehicles()
  }, [search, page])

  async function handleDelete (item) {
    ShowConfirm('Atenção', `Confirma a remoção do veículo ${item.model}?`, () =>
      handleDeleteConfirm(item.id)
    )
  }

  async function handleDeleteConfirm (id) {
    try {
      setLoading(true)
      await api.delete(`vehicles/${id}`)

      showToast.success('Veículo excluído com sucesso!')
      const updateVehicles = vehicles.filter(c => c.id !== id)
      setVehicles(updateVehicles)
      setTotal(total - 1)
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
      title='Veículos'
      loading={loading ? Boolean(loading) : undefined}
    >
      <Search onSearch={setSearch} setPage={setPage} />
      <span>
        <span>{total > 0 && <span>Total {total}</span>}</span>
        <Link to='/vehicle/create'>
          <FiPlus size={20} /> Cadastrar
        </Link>
      </span>

      {noData && <NoData text={`Não há dados para exibir :(`} />}
      <Main>
        <Ul>
          {vehicles.map(vehicle => (
            <ListItem
              item={vehicle}
              key={vehicle.id}
              onUpdateClick={handleUpdate}
              onDeleteClick={handleDelete}
            />
          ))}
        </Ul>
      </Main>

      <LoadMore
        onClick={() => setPage(page + 1)}
        total={total}
        loadedItens={vehicles.length}
      />
    </Container>
  )
}

export default VehicleList
