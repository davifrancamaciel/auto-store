import React, { useState, useRef, useEffect } from 'react'
import { useField } from '@rocketseat/unform'
import api from '../../../services/api'
import { Container } from './styles'
import { AVATAR_DEFAULT } from '../../../constants/user'

function AvatarInput () {
  const { defaultValue, registerField } = useField('avatar')
  const [file, setFile] = useState(defaultValue && defaultValue.id)
  const [preview, setPreview] = useState(defaultValue && defaultValue.url)
  const ref = useRef()

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'avatar_id',
        ref: ref.current,
        path: 'dataset.file'
      })
    }
  }, [ref, useField])

  async function handleChange (e) {
    const data = new FormData()
    data.append('file', e.target.files[0])

    const response = await api.post('files', data)
    const { id, url } = response.data
    setPreview(url)
    setFile(id)
  }

  return (
    <Container>
      <label htmlFor='image'>
        <img src={preview|| AVATAR_DEFAULT} alt='' />
        <input
          ref={ref}
          data-file={file}
          type='file'
          accept='image/*'
          id='image'
          onChange={handleChange}
        />
      </label>
    </Container>
  )
}

export default AvatarInput
