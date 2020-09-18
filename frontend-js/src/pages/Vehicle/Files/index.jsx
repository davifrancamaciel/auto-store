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
          const response = await api.get(`files/${id}`)

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

  useEffect(() => {
    return () => {
      console.log('will unmount')
      uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview))
    }
  }, [])

  useEffect(() => {
    console.log(uploadedFiles)
  }, [uploadedFiles])

  function handleUpload (files) {
    const uploadedFilesNew = files.map(file => ({
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
    console.log(uploadedFiles)

    setUploadedFiles([...uploadedFilesNew, ...uploadedFiles])

    uploadedFilesNew.forEach(processUpload)
  }

  function processUpload (uploadedFile) {
    console.log('chamo up')
    const data = new FormData()
    data.append('file', uploadedFile.file, uploadedFile.name)
    data.append('vehicle_id', id)

    api
      .post('files', data, {
        responseType: 'arraybuffer',
        onDownloadProgress: e => {
          // console.log('progresso e ', e)
          const progress = Number(
            Math.round((Number(e.loaded) * 100) / Number(e.total))
          )
          // console.log('progresso ', progress)
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

  function updateFile (id, data) {
    const uploadedFilesUpdated = uploadedFiles.map(fileUploaded => {
      return id === fileUploaded.id
        ? {
            ...fileUploaded,
            ...data
          }
        : fileUploaded
    })
    console.log('updateFile ',uploadedFilesUpdated)
    setUploadedFiles(uploadedFilesUpdated)
  }

  async function handleDelete (id) {
    await api.delete(`files/${id}`)

    setUploadedFiles(uploadedFiles.filter(file => file.id !== id))
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
