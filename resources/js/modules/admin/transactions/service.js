import QueryString from 'query-string'
import Http from '../../../utils/Http'
import Transformer from '../../../utils/Transformer'
// import {catchError} from '../../../utils/RequestResponse'
import * as actions from './store/actions'
import {processError} from "../../../common/error"

export function fetchTransactions(params = null) {
  let queryParams = params ? `?${QueryString.stringify(params)}` : '';

  return dispatch => (
    new Promise((resolve, reject) => {
      // Http.get(`/admin/companies${queryParams}`)
      Http.get(`/admin/transactions${queryParams}`)
        .then((res) => {
          const data = Transformer.fetch(res.data);
          // dispatch(actions.fetchCompanyListSuccess(data));
          return resolve(data);
        })
        .catch((err) => {
          // console.error(err);
          // dispatch(actions.fetchCompanyListError(err));
          return reject(processError(err));
        })
    })
  )
}

export function fetchTransactionDetail(id) {
  return dispatch => (
    new Promise((resolve, reject) => {
      return Http.get(`/admin/transactions/${id}`)
        .then(res => {
          const data = Transformer.fetch(res.data);
          console.log('fetchTransactionDetail', data);
          return resolve(data);
          // const account = data.account;
          // const [lastName, firstName] = account.displayName.split(' ');
          // const accountId = account.id;
          // const children = account.children;
          // delete account.children;
          // delete data.account;
          // delete account.id;
          // const company = Object.assign({}, data, {firstName, lastName, accountId}, {...account});
          // dispatch(actions.fetchCompanyDetail(company));
          // dispatch(fetchUserChildren(children))
        })
        .catch(err => {
          return reject(processError(err));
          // dispatch(actions.fetchCompanyDetailError(err));
        })
    })
  )
}

export function impersonate(id) {
  return dispatch => {
    return Http.get(`/admin/impersonate/${id}`)
      .then(res => {
        const data = Transformer.fetch(res.data);
        dispatch(actions.impersonateSuccess(data));
      })
      .catch(err => {
        dispatch(actions.impersonateError(err));
      })
  }
}

export function clearCompanyDetail() {
  return dispatch => {
    return dispatch(actions.clearCompanyDetail());
  }
}

export function deleteCompany(id) {
  return dispatch => {
    return Http.delete(`/admin/transactions/${id}`)
      .then(() => {
        dispatch(actions.deleteCompany());
      })
      .catch(err => {
        dispatch(actions.deleteCompanyError(err));
      })
  }
}

export function addCompany(data) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post(`/admin/transactions`, data)
        .then((res) => {
          const data = Transformer.fetch(res.data);
          dispatch(actions.addCompanySuccess(data));
          return resolve(data);
        })
        .catch((err) => {
          return reject(processError(err));
        })
    })
  );
}

export function editCompany(data, id) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.put(`/admin/transactions/${id}`, data)
        .then(() => {
          return resolve(dispatch(actions.editCompanySuccess()));
        })
        .catch((err) => {
          return reject(processError(err));
        })
    })
  );
}
