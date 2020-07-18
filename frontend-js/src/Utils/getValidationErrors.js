import { toast } from 'react-toastify'

export default function getValidationErrors (err) {

  if (!err || !err.response || !err.response.data || !err.response.data.error) {
    return
  }
  const message = err.response.data.error
  
  toast.error(message)  
}
