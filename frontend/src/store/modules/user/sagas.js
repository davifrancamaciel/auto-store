import { all, takeLatest, put, call } from 'redux-saga/effects'

import { USER_UPDATE_PROFILE_REQUEST } from '../../../constants/user'
import api from '../../../services/api'
import { updateProfileFailure, updateProfileSuccess } from './actions'
import getValidationErrors from '../../../Utils/getValidationErrors'
import showToast from '../../../Utils/showToast'
import history from '../../../services/browserhistory'

export function * updateProfile ({ payload }) {
  try {
    const { name, email, image, company_id, whatsapp, ...rest } = payload.data
    const profile = Object.assign(
      { name, email, image, company_id, whatsapp },
      rest.oldPassword ? rest : {}
    )

    let formData = new FormData()

    formData.append('name', profile.name)
    formData.append('email', profile.email)
    formData.append('whatsapp', profile.whatsapp)
    formData.append('company_id', profile.company_id)

    if (profile.oldPassword) {
      formData.append('oldPassword', profile.oldPassword)
      formData.append('password', profile.password)
      formData.append('confirmPassword', profile.confirmPassword)
    }
    if (image) {
      formData.append('file', image)
    }

    const response = yield call(api.put, 'profile', formData)
    showToast.success('Perfil alterado com sucesso.')
    
    history.goBack()

    yield put(updateProfileSuccess(response.data))
  } catch (error) {
    getValidationErrors(error)
    yield put(updateProfileFailure())
  }
}
export default all([takeLatest(USER_UPDATE_PROFILE_REQUEST, updateProfile)])
