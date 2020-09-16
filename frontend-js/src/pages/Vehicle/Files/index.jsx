import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Form } from '@rocketseat/unform'

import Container from '../../../components/_layouts/Container'
import FormContainer from '../../../components/_layouts/FormContainer'
import Dropzone from '../../../components/Inputs/Dropzone'
import BackPage from '../../../components/BackPage'

import api from '../../../services/api'
import history from '../../../services/browserhistory'
import getValidationErrors from '../../../Utils/getValidationErrors'
import showToast from '../../../Utils/showToast'

import getImage from '../../../Utils/getImage'

const Files = () => {
  const { id } = useParams()
  const [selectedImages, setSelectedImages] = useState([])
  const [vehicle, setVehicle] = useState({})
  const [title, setTitle] = useState()

  useEffect(() => {
    const complement = vehicle.brand
      ? `${vehicle.brand} ${vehicle.model}`
      : vehicle.model
    vehicle.model && setTitle(`Imagens do veículo ${complement}`)
  }, [vehicle])

  useEffect(() => {
    if (id) {
      async function loadVehicle (id) {
        try {
          const response = await api.get(`vehicles/${id}`)
          setVehicle(response.data)
        } catch (error) {
          getValidationErrors(error)
          history.push('/vehicle')
        }
      }
      loadVehicle(id)
    } else {
      history.push('/vehicle')
    }
  }, [])

  return (
    <Container title={title}>
      <FormContainer>
        <Form>
          <fieldset>
            <legend>
              <h2></h2>
              <BackPage />
            </legend>
            <Dropzone onFileSelectedUpload={setSelectedImages} multiple />
          </fieldset>
        </Form>
      </FormContainer>
    </Container>
  )
}

export default Files
