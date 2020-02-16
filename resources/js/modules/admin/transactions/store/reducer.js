import Http from '../../../../utils/Http';
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

export const initialState = {
  detail: {},
  list: {},
  loading: false,
  loaded: false,
  errors: {},
  deleted: false,
  reloadPage: false,
  impersonatorId: null,
};

function companyReducer(state = initialState, { type, payload = null }) {
  switch (type) {
    case FETCH_COMPANY_LIST_SUCCESS:
      return setCompanyList(state, payload);
    case FETCH_COMPANY_LIST_ERROR:
      return setError(state, payload);
    case FETCH_COMPANY_DETAIL:
      return setCompanyDetail(state, payload);
    case FETCH_COMPANY_DETAIL_ERROR:
      return setCompanyDetailError(state, payload);
    case CLEAR_COMPANY_DETAIL:
      return clearCompanyDetail(state);
    case DELETE_COMPANY:
      return setDelete(state);
    case DELETE_COMPANY_ERROR:
      return setDeleteError(state, payload);
    case IMPERSONATE_SUCCESS:
      return impersonateSuccess(state, payload);
    case IMPERSONATE_ERROR:
      return impersonateError(state, payload);
    case ADD_COMPANY_SUCCESS:
      return saveCompanyDataSuccess(state, payload);
    case ADD_COMPANY_ERROR:
      return setError(state, payload);
    case EDIT_COMPANY_SUCCESS:
      return saveCompanyDataSuccess(state);
    case EDIT_COMPANY_ERROR:
      return setError(state, payload);
    default:
      return state;
  }
}

function setCompanyList(state, payload) {
  return Object.assign({}, state, {
    list: {
      ...payload
    },
    loaded: true,
    loading: false,
    reloadPage: false,
  });
}

function setError(state, payload) {
  return Object.assign({}, state, {
    loaded: true,
    errors: payload,
    loading: false,
  });
}

function setCompanyDetail(state, payload) {
  return Object.assign({}, state, {
    ...state,
    loaded: true,
    loading: false,
    errors: {},
    detail: { ...payload },
  });
}

function setCompanyDetailError(state, payload) {
  return Object.assign({}, state, {
    ...state,
    loaded: true,
    loading: false,
    errors: payload,
    detail: {},
  });
}

function clearCompanyDetail(state) {
  return Object.assign({}, state, {
    ...state,
    loaded: false,
    loading: false,
    deleted: false,
    reloadPage: false,
    errors: {},
    detail: {},
  });
}

function setDelete(state) {
  return Object.assign({}, state, {
    ...state,
    loading: false,
    loaded: true,
    deleted: true,
    errors: {},
    detail: {},
    reloadPage: true,
  });
}

function setDeleteError(state, payload) {
  return Object.assign({}, state, {
    ...state,
    loaded: true,
    loading: false,
    errors: payload,
    deleted: false,
  });
}

function impersonateSuccess(state, payload) {
  localStorage.setItem('access_token', payload.accessToken);
  const impersonatorId = localStorage.getItem('impersonatorId');
  const leaveImpersonation = localStorage.getItem('leaveImpersonation');

  if (impersonatorId === null) {
    localStorage.setItem('impersonatorId', payload.impersonator.id);
  }

  Http.defaults.headers.common['X-Access-Token'] = payload.accessToken;

  if (JSON.parse(leaveImpersonation)) {
    if (payload.user.accountType === 'admin') {
      window.location.replace('/admin/companies');
    } else {
      window.location.replace('/admin/accounts');
    }
  } else {
    if (payload.user.accountType === 'user') {
      window.location.replace('/story-collection');
    } else {
      window.location.replace('/admin/dashboard');
    }
  }

  return Object.assign({}, state, {
    ...state,
    impersonatorId: payload.impersonator.id,
  });
}

function impersonateError(state, payload) {
  return Object.assign({}, state, {
    ...state,
    errors: payload,
  });
}

function saveCompanyDataSuccess(state, payload) {
  return {
    ...state,
    detail: payload,
  };
}

export default companyReducer
