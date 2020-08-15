import React from 'react'

import { all, takeLatest, call, put } from 'redux-saga/effects'

import history from '../../../services/browserhistory'
import {
  AUTH_SIGN_IN_REQUEST,
  AUTH_SIGN_UP_REQUEST,
  AUTH_SIGN_OUT
} from '../../../constants/auth'
import { signInSuccess, signFailure, signUpSuccess } from './actions'
import api from '../../../services/api'
import showToast from '../../../Utils/showToast'
import getValidationErrors from '../../../Utils/getValidationErrors'

export function * signIn ({ payload }) {
  try {
    const { email, password } = payload

    const response = yield call(api.post, '/sessions', {
      email,
      password
    })

    const { token, user } = response.data

    api.defaults.headers['Authorization'] = `Bearer ${token}`

    yield put(signInSuccess(token, user))

    history.push('/dashboard')
  } catch (error) {
    getValidationErrors(error)
    yield put(signFailure())
  }
}

export function * signUp ({ payload }) {
  try {
    const { name, email, password, whatsapp, company_name } = payload

    yield call(api.post, 'register', {
      name,
      email,
      password,
      provider: true,
      whatsapp,
      company_name
    })

    history.push('/')
    showToast.success('Sua conta foi criada com sucesso!')
    yield put(signUpSuccess())
  } catch (error) {
    getValidationErrors(error)
    yield put(signFailure())
  }
}
function setToken ({ payload }) {
  if (!payload) return

  const { token } = payload.auth

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`
  }
}

function signOut () {
  history.push('/')
}
export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest(AUTH_SIGN_IN_REQUEST, signIn),
  takeLatest(AUTH_SIGN_UP_REQUEST, signUp),
  takeLatest(AUTH_SIGN_OUT, signOut)
])
