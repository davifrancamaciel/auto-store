import axios from 'axios'

export default async function getLocale (zip_code) {
  try {
    
    if (!zip_code) return null
    
    const numberPattern = /\d+/g
    zip_code = zip_code.match(numberPattern)
    zip_code = zip_code.map(x => x).join('')
    
    if (zip_code.length < 8) return

    const url = `http://cep.republicavirtual.com.br/web_cep.php?cep=${zip_code}&formato=json`

    const response = await axios.get(url)

    const { data } = response

    return {
      state: data.uf,
      city: data.cidade,
      neighborhood: data.bairro,
      street: `${data.tipo_logradouro} ${data.logradouro}`
    }
  } catch (error) {
    return null
  }
}
