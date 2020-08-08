import React, { useEffect ,useCallback,useState} from 'react'

import Input from '../Input'
import InputMask from '../InputMask'
import getLocale from '../../Utils/getLocale'

function Adress ({onCepChange}) {
  const [cepChanged, setCepChanged] = useState('')
  const [adressChanged, setAdressChanged] = useState()

  useEffect(() => {
    async function loadCep () {
      const response = await getLocale(cepChanged)
      console.log(response)
      setAdressChanged({        
        ...response
      })
    }
    loadCep()
  }, [cepChanged])

  useCallback(
      () => {
        onCepChange(adressChanged)
      },
      [onCepChange],
  )
  return (
    <fieldset>
      <legend>
        <h2>Endereço</h2>
      </legend>
      <div className='field-group'>
        <InputMask
          mask='99999-999'
          label='Cep'
          name='cep'
          type='tel'
          onChangeCep={setCepChanged}
        />
        <Input name='uf' type='text' label='UF' />
        <Input name='city' type='text' label='Cidade' />
      </div>
      <div className='field-group'>
        <Input name='bairro' type='text' label='Bairro' />
        <Input name='logradouro' type='text' label='Logradouro' />
      </div>
    </fieldset>
  )
}

export default Adress
