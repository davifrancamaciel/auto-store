import produce from 'immer'
import { AUTH_SIGN_IN_SUCCESS, AUTH_SIGN_OUT } from '../../../constants/auth'
import {
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_FAILURE
} from '../../../constants/user'

const INITIAL_STATE = {
  profile: null,
  loading: false
}

export default function user (state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case AUTH_SIGN_IN_SUCCESS: {
        draft.profile = action.payload.user
        draft.loading = false
        break
      }
      case USER_UPDATE_PROFILE_REQUEST: {
        draft.loading = true
        break
      }
      case USER_UPDATE_PROFILE_SUCCESS: {
        draft.profile = action.payload.profile
        draft.loading = false
        break
      }
      case USER_UPDATE_PROFILE_FAILURE: {
        draft.loading = false
        break
      }
      
      case AUTH_SIGN_OUT: {
        draft.profile = null
        break
      }

      default:
    }
  })
}
