import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Form } from '@rocketseat/unform'
import { uniqueId } from 'lodash'
import filesize from 'filesize'

import Container from '../../../components/_layouts/Container'
import FormContainer from '../../../components/_layouts/FormContainer'
import Dropzone from '../../../components/Inputs/Dropzone'
import FileList from '../../../components/FileList'
import BackPage from '../../../components/BackPage'

import api from '../../../services/api'
import history from '../../../services/browserhistory'
import getValidationErrors from '../../../Utils/getValidationErrors'
import showToast from '../../../Utils/showToast'

import getImage from '../../../Utils/getImage'

const Files = () => {
  const { id } = useParams()

  const [uploadedFiles, setUploadedFiles] = useState([])
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
          // history.push('/vehicle')
        }
      }
      loadVehicle(id)
    } else {
      history.push('/vehicle')
    }
  }, [])

  useEffect(() => {
    if (id) {
      async function loadFiles (id) {
        try {
          const response = await api.get(`files`)

          setUploadedFiles(
            response.data.map(file => ({
              id: file.id,
              name: file.name,
              readableSize: filesize(file.size),
              preview: file.url,
              uploaded: true,
              url: file.url
            }))
          )
        } catch (error) {
          getValidationErrors(error)
          // history.push('/vehicle')
        }
      }
      loadFiles(id)
    } else {
      history.push('/vehicle')
    }
  }, [])

  // useEffect(() => {
  //   uploadedFiles.forEach(processUpload)
  // }, [uploadedFiles])


  // fazer a saida do componente
  // componentWillUnmount(){
  //   uploadedFiles.forEach(file=>URL.revokeObjectURL(file.preview))
  // }

  const handleUpload = files => {
    const uploadedFiles = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null
    }))

    setUploadedFiles([...uploadedFiles, ...uploadedFiles])

    uploadedFiles.forEach(processUpload)
  }

  const handleDelete = async id => {
    await api.delete(`files/${id}`)

    setUploadedFiles(uploadedFiles.filter(file => file.id !== id))
  }

  const updateFile = (id, data) => {
    setUploadedFiles(
      uploadedFiles.map(uploadedFiles => {
        return id === uploadedFiles.id
          ? {
              ...uploadedFiles,
              ...data
            }
          : uploadedFiles
      })
    )
  }

  const processUpload = uploadedFile => {
    console.log('chamo up')
    const data = new FormData()
    data.append('file', uploadedFile.file, uploadedFile.name)
    data.append('vehicle_id', vehicle.id)

    api
      .post('files', data, {
        onDownloadProgress: e => {
          const progress = Number(Math.round((e.loaded * 100) / e.total))
          console.log('progresso ',progress)
          updateFile(uploadedFile.id, {
            progress
          })
        }
      })
      .then(response => {
        updateFile(uploadedFile.id, {
          uploaded: true,
          id: response.data.id,
          url: response.data.url
        })
      })
      .catch(() => {
        updateFile(uploadedFile.id, {
          error: true
        })
      })
  }

  return (
    <Container title={title}>
      <FormContainer>
        <Form>
          <fieldset>
            <legend>
              <h2></h2>
              <BackPage />
            </legend>
            <Dropzone multiple onUpload={handleUpload} />
          </fieldset>
        </Form>
        {!!uploadedFiles.length && (
          <FileList files={uploadedFiles} onDelete={handleDelete} />
        )}
      </FormContainer>
    </Container>
  )
}

export default Files
