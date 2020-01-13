import {
  AUTH_CHECK,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_USER,
} from './action-types';

export function authCheck() {
  return {
    type: AUTH_CHECK,
  }
}

export function authLogin(payload) {
  return {
    type: AUTH_LOGIN,
    payload,
  };
}

export function authLogout() {
  return {
    type: AUTH_LOGOUT,
  }
}

export function authUser(payload) {
  return {
    type: AUTH_USER,
    payload
  }
}
