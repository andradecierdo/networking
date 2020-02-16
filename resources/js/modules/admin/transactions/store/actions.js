import {
  FETCH_COMPANY_LIST_SUCCESS,
  FETCH_COMPANY_LIST_ERROR,
  FETCH_COMPANY_DETAIL,
  FETCH_COMPANY_DETAIL_ERROR,
  CLEAR_COMPANY_DETAIL,
  DELETE_COMPANY,
  DELETE_COMPANY_ERROR,
  IMPERSONATE_SUCCESS,
  IMPERSONATE_ERROR,
  ADD_COMPANY_SUCCESS,
  ADD_COMPANY_ERROR,
  EDIT_COMPANY_SUCCESS,
  EDIT_COMPANY_ERROR,
} from './action-types'

export const fetchCompanyListSuccess = (payload) => ({
  type: FETCH_COMPANY_LIST_SUCCESS,
  payload
});

export const fetchCompanyListError = (payload) => ({
  type: FETCH_COMPANY_LIST_ERROR,
  payload
});

export function fetchCompanyDetail(payload) {
  return {
    type: FETCH_COMPANY_DETAIL,
    payload
  }
}

export function fetchCompanyDetailError(payload) {
  return {
    type: FETCH_COMPANY_DETAIL_ERROR,
    payload
  }
}

export function clearCompanyDetail() {
  return {
    type: CLEAR_COMPANY_DETAIL
  }
}

export function deleteCompany() {
  return {
    type: DELETE_COMPANY
  }
}

export function deleteCompanyError(payload) {
  return {
    type: DELETE_COMPANY_ERROR,
    payload,
  }
}

export function impersonateSuccess(payload) {
  return {
    type: IMPERSONATE_SUCCESS,
    payload,
  }
}

export function impersonateError(payload) {
  return {
    type: IMPERSONATE_ERROR,
    payload,
  }
}

export function addCompanySuccess(payload) {
  return {
    type: ADD_COMPANY_SUCCESS,
    payload,
  }
}

export function addCompanyError() {
  return {
    type: ADD_COMPANY_ERROR,
  }
}

export function editCompanySuccess() {
  return {
    type: EDIT_COMPANY_SUCCESS,
  }
}

export function editCompanyError() {
  return {
    type: EDIT_COMPANY_ERROR,
  }
}
