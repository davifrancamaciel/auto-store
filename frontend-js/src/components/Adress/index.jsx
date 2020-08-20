import React, { useEffect ,useCallback,useState} from 'react'

import Input from '../Input'
import InputMask from '../InputMask'
import getLocale from '../../Utils/getLocale'

function Adress ({onzip_codeChange}) {
  const [zip_codeChanged, setzip_codeChanged] = useState('')
  const [adressChanged, setAdressChanged] = useState()

  useEffect(() => {
    async function loadzip_code () {
      const response = await getLocale(zip_codeChanged)
      console.log(response)
      setAdressChanged({        
        ...response
      })
    }
    loadzip_code()
  }, [zip_codeChanged])

  useCallback(
      () => {
        onzip_codeChange(adressChanged)
      },
      [onzip_codeChange],
  )
  return (
    <fieldset>
      <legend>
        <h2>Endereço</h2>
      </legend>
      <div className='field-group'>
        <InputMask
          mask='99999-999'
          label='zip_code'
          name='zip_code'
          type='tel'
          onChangezip_code={setzip_codeChanged}
        />
        <Input name='uf' type='text' label='UF' />
        <Input name='city' type='text' label='Cidade' />
      </div>
      <div className='field-group'>
        <Input name='district' type='text' label='Bairro' />
        <Input name='street' type='text' label='Logradouro' />
      </div>
    </fieldset>
  )
}

export default Adress
