import React from 'react'

import { all, takeLatest, call, put } from 'redux-saga/effects'
import { toast } from 'react-toastify'

import history from '../../../services/browserhistory'
import {
  AUTH_SIGN_IN_REQUEST,
  AUTH_SIGN_UP_REQUEST,
  AUTH_SIGN_OUT
} from '../../../constants/auth'
import { signInSuccess, signFailure } from './actions'
import api from '../../../services/api'

export function * signIn ({ payload }) {
  try {
    const { email, password } = payload

    const response = yield call(api.post, '/sessions', {
      email,
      password
    })    

    const { token, user } = response.data

    // if (!user.provider) {
    //   toast.error('Usuario não é prestador de serviços.')
    //   return
    // }

    api.defaults.headers['Authorization'] = `Bearer ${token}`

    yield put(signInSuccess(token, user))

    history.push('/dashboard')
  } catch (err) {
    
    const message = err.response.data.error
    
    if (message) {
      toast.error(message)
    } else {
      toast.error('Usuario não encontrado.')
    }
    yield put(signFailure())
  }
}

export function * signUp ({ payload }) {
  try {
    const { name, email, password } = payload

    yield call(api.post, 'users', {
      name,
      email,
      password,
      provider: true
    })

    history.push('/')
  } catch (error) {
    if (error.error) toast.error(error.error)
    else toast.error('Falha no cadastro verifique seus dados')
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
