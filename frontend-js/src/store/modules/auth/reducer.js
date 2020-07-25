import produce from 'immer'
import {
  INITIAL_STATE,
  AUTH_SIGN_IN_REQUEST,
  AUTH_SIGN_IN_SUCCESS,
  AUTH_SIGN_UP_REQUEST,
  AUTH_SIGN_UP_SUCCESS,
  AUTH_SIGN_FAILURE,
  AUTH_SIGN_OUT
} from '../../../constants/auth'

export default function auth (state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case AUTH_SIGN_IN_REQUEST: {
        draft.loading = true
        break
      }

      case AUTH_SIGN_IN_SUCCESS: {
        draft.token = action.payload.token
        draft.signed = true
        draft.loading = false
        break
      }

      case AUTH_SIGN_UP_REQUEST: {
        draft.loading = true
        break
      }

      case AUTH_SIGN_UP_SUCCESS: {
        draft.token = action.payload.token
        draft.loading = false
        break
      }

      case AUTH_SIGN_FAILURE: {
        draft.loading = false
        break
      }

      case AUTH_SIGN_OUT: {
        draft.token = null
        draft.signed = false
        break
      }

      default:
    }
  })
}
