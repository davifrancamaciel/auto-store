import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'
import Container from '../../../components/Container'
import ShowConfirm from '../../../components/ShowConfirm'
import NoData from '../../../components/NoData'

import ListItem from './ListItem'
import Search from './Search'

import api from '../../../services/api'
import history from '../../../services/browserhistory'
import getValidationErrors from '../../../Utils/getValidationErrors'
import getImage from '../../../Utils/getImage'
import showToast from '../../../Utils/showToast'

import { Main, Ul } from '../../../components/ListContainer/styles'

const VehicleList = () => {
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState()
  const [noData, setNoData] = useState(false)
  const [vehicles, setVehicles] = useState([])

  useEffect(() => {
    async function loadvehicles () {
      try {
        setLoading(true)

        const response = await api.get('vehicles', { params: search })

        setVehicles(response.data)
        console.log(response.data)
        setNoData(response.data.length == 0)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        getValidationErrors(error)
      }
    }

    loadvehicles()
  }, [search])

  async function handleDelete (item) {
    ShowConfirm(
      'Atenção',
      `Confirma a remoção do veículo ${item.name}?`,
      () => {
        handleDeleteConfirm(item.id)
      }
    )
  }

  async function handleDeleteConfirm (id) {
    try {
      setLoading(true)
      await api.delete(`vehicles/${id}`)

      showToast.success('Veículo excluído com sucesso!')
      const updateVehicles = vehicles.filter(c => c.id !== id)
      setVehicles(updateVehicles)
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
      <Search onSearch={setSearch} />
      <span>
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
    </Container>
  )
}

export default VehicleList
