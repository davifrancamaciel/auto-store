import {
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAILURE
  } from '../../../constants/user'
  export function updateProfileRequest (data) {
    return {
      type: USER_UPDATE_PROFILE_REQUEST,
      payload: { data }
    }
  }
  
  export function updateProfileSuccess (profile) {
    return {
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: { profile }
    }
  }
  
  export function updateProfileFailure () {
    return {
      type: USER_UPDATE_PROFILE_FAILURE
    }
  }
  