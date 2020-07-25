import {
  AUTH_SIGN_IN_REQUEST,
  AUTH_SIGN_IN_SUCCESS,
  AUTH_SIGN_UP_REQUEST,
  AUTH_SIGN_UP_SUCCESS,
  AUTH_SIGN_FAILURE,
  AUTH_SIGN_OUT
} from '../../../constants/auth'

export function signInRequest (email, password) {
  return {
    type: AUTH_SIGN_IN_REQUEST,
    payload: { email, password }
  }
}

export function signInSuccess (token, user) {
  return {
    type: AUTH_SIGN_IN_SUCCESS,
    payload: { token, user }
  }
}

export function signFailure () {
  return {
    type: AUTH_SIGN_FAILURE
  }
}

export function signOut () {
  return {
    type: AUTH_SIGN_OUT
  }
}

export function signUpRequest (name, email, password, whatsapp) {
  return {
    type: AUTH_SIGN_UP_REQUEST,
    payload: { name, email, password, whatsapp }
  }
}

export function signUpSuccess () {
  return {
    type: AUTH_SIGN_UP_SUCCESS
  }
}
