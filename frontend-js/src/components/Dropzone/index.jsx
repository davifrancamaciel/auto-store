import React, { useCallback, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUpload } from 'react-icons/fi'

import { Container } from './styles'

function Dropzone ({ onFileSelectedUpload, image }) {
  
  const [selectedFileUrl, setSelectedFileUrl] = useState('')

  useEffect(() => {
    if (image) {
      setSelectedFileUrl(image)
    }
  }, [image])

  const onDrop = useCallback(
    acceptedFiles => {
      const file = acceptedFiles[0]
      const fileUrl = URL.createObjectURL(file)
      setSelectedFileUrl(fileUrl)
      onFileSelectedUpload(file)
    },
    [onFileSelectedUpload]
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*'
  })

  return (
    <Container {...getRootProps()}>
      <input {...getInputProps()} accept='image/*' />
      {selectedFileUrl ? (
        <img src={selectedFileUrl} alt='Imagem' />
      ) : (
        <p>
          <FiUpload /> Imagem
        </p>
      )}
    </Container>
  )
}
export default Dropzone
