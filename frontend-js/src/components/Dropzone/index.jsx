import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUpload } from 'react-icons/fi'

import { Container } from './styles'

function Dropzone ({ onFileSelectedUpload }) {
  const [selectedFileUrl, setSelectedFileUrl] = useState('')

  function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setSelectedFileUrl(reader.result);
      onFileSelectedUpload(reader.result)
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }

  const onDrop = useCallback(
    acceptedFiles => {
      // Do something with the files 1 e 5
      const file = acceptedFiles[0]
      const fileUrl = URL.createObjectURL(file)
      const  base64data = getBase64(file)
      setSelectedFileUrl(base64data)
      onFileSelectedUpload(base64data)
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
