import showToast from './showToast'

export default function getValidationErrors (err) {

  console.error(err)
  
  if (!err || !err.response || !err.response.data || !err.response.data.error) {
    return
  }
  const message = err.response.data.error
  
  showToast.error(message)  

  if (err.response.status === 401) {
		const btnLogout = document.getElementById('logout');
		btnLogout && btnLogout.click();
	}

}
