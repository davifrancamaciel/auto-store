import showToast from './showToast'

export default function getValidationErrors (err) {

  if (!err || !err.response || !err.response.data || !err.response.data.error) {
    return
  }
  const message = err.response.data.error
  
  showToast.error(message)  

  console.error(err)
}
