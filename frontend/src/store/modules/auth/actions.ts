import {
  AUTH_SIGN_IN_REQUEST,
  AUTH_SIGN_IN_SUCCESS,
  AUTH_SIGN_UP_REQUEST,
  AUTH_SIGN_FAILURE,
  AUTH_SIGN_OUT
} from '../../../constants/auth'


export function signInRequest (email: String, password: String) {
  return {
    type: AUTH_SIGN_IN_REQUEST,
    payload: { email, password }
  }
}

export function signInSuccess (token: String, user: any) {
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
export function signUpRequest (name: string, email: string, password: string) {
  return {
    type: AUTH_SIGN_UP_REQUEST,
    payload: { name, email, password }
  }
}
