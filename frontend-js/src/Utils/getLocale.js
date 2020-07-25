import axios from 'axios'

export default async function getLocale (cep) {
  try {
    
    if (!cep) return null
    
    const numberPattern = /\d+/g
    cep = cep.match(numberPattern)
    cep = cep.map(x => x).join('')
    
    if (cep.length < 8) return

    const url = `http://cep.republicavirtual.com.br/web_cep.php?cep=${cep}&formato=json`

    const response = await axios.get(url)

    const { data } = response

    return {
      uf: data.uf,
      city: data.cidade,
      bairro: data.bairro,
      logradouro: `${data.tipo_logradouro} ${data.logradouro}`
    }
  } catch (error) {
    return null
  }
}
