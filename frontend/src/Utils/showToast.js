import { toast } from 'react-toastify'

function error (message) {
  toast.error(message)
}

function success (message) {
  toast.success(message)
}

export default { error, success }
