import React, { useCallback, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUpload } from 'react-icons/fi'

import {
  Container,
  ThumbsContainer,
  Thumb,
  ThumbInner,
  ThumbImg
} from './styles'

function Dropzone ({ onFileSelectedUpload, image, multiple }) {
  const [selectedFileUrl, setSelectedFileUrl] = useState('')
  const [selectedFiles, setSelectedFiles] = useState([])
  const [selectedFilesPreview, setSelectedFilesPreview] = useState([])

  useEffect(() => {
    if (image) {
      setSelectedFileUrl(image)
    }
  }, [image])

  useEffect(() => {
    console.log(selectedFiles)
    console.log(selectedFilesPreview)
  }, [selectedFiles, selectedFilesPreview])

  const onDrop = useCallback(
    acceptedFiles => {
      if (multiple) {
        const files = acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
        setSelectedFilesPreview([...selectedFilesPreview, ...files])
        setSelectedFiles([...selectedFiles, ...acceptedFiles])
        onFileSelectedUpload([...selectedFiles, ...acceptedFiles])
      } else {
        const file = acceptedFiles[0]
        const fileUrl = URL.createObjectURL(file)
        setSelectedFileUrl(fileUrl)
        onFileSelectedUpload(file)
      }
    },
    [onFileSelectedUpload]
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*'
  })

  const thumbs = selectedFilesPreview.map(file => (
    <Thumb key={file.name}>
      <ThumbInner>
        <ThumbImg src={file.preview} />
      </ThumbInner>
    </Thumb>
  ))

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      selectedFiles.forEach(file => URL.revokeObjectURL(file.preview))
    },
    [selectedFiles]
  )

  return (
    <div>
      <Container {...getRootProps()} className='gf-dropzone'>
        <input {...getInputProps()} accept='image/*' />
        {selectedFileUrl && !multiple ? (
          <img src={selectedFileUrl} alt='Imagem' />
        ) : (
          <p>
            <FiUpload /> Imagem
          </p>
        )}
      </Container>
      {multiple && <ThumbsContainer>{thumbs}</ThumbsContainer>}
    </div>
  )
}
export default Dropzone
