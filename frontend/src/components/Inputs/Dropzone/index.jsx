import React, { useCallback, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUpload } from 'react-icons/fi'

import { Container } from './styles'

function Dropzone ({ onFileSelectedUpload, image, multiple, onUpload }) {
  const [selectedFileUrl, setSelectedFileUrl] = useState('')

  useEffect(() => {
    if (image) {
      setSelectedFileUrl(image)
    }
  }, [image])

  const onDrop = useCallback(
    acceptedFiles => {
      if (multiple) {
        onUpload(acceptedFiles)
      } else {
        const file = acceptedFiles[0]
        const fileUrl = URL.createObjectURL(file)
        setSelectedFileUrl(fileUrl)
        onFileSelectedUpload(file)
      }
    },
    [onFileSelectedUpload]
  )
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject
  } = useDropzone({
    onDrop,
    accept: 'image/*'
  })

  return (
    <div>
      <Container {...getRootProps()} className='gf-dropzone'>
        <input
          {...getInputProps()}
          // isDragActive={isDragActive}
          // isDragReject={isDragReject}
          accept='image/*'
        />
        {selectedFileUrl && !multiple ? (
          <img src={selectedFileUrl} alt='Imagem' />
        ) : (
          <p>
            <FiUpload /> Imagem
          </p>
        )}
      </Container>
    </div>
  )
}
export default Dropzone
