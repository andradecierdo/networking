import QueryString from 'query-string'
import Http from '../../../utils/Http'
import Transformer from '../../../utils/Transformer'
import {processError} from "../../../common/error"

export function fetchTransactions(params = null) {
  let queryParams = params ? `?${QueryString.stringify(params)}` : '';

  return () => (
    new Promise((resolve, reject) => {
      Http.get(`/admin/transactions${queryParams}`)
        .then((res) => {
          const data = Transformer.fetch(res.data);
          return resolve(data);
        })
        .catch((err) => {
          return reject(processError(err));
        })
    })
  )
}

export function fetchTransactionDetail(id) {
  return () => (
    new Promise((resolve, reject) => {
      return Http.get(`/admin/transactions/${id}`)
        .then(res => {
          const data = Transformer.fetch(res.data);
          return resolve(data);
        })
        .catch(err => {
          return reject(processError(err));
        })
    })
  )
}

export function deleteTransaction(id) {
  return () => (
    new Promise((resolve, reject) => {
      return Http.delete(`/admin/transactions/${id}`)
        .then(res => {
          return resolve(res);
        })
        .catch(err => {
          return reject(processError(err));
        })
    })
  )
}

export function addTransaction(data) {
  return () => (
    new Promise((resolve, reject) => {
      Http.post(`/admin/transactions`, data)
        .then((res) => {
          const data = Transformer.fetch(res.data);
          return resolve(data);
        })
        .catch((err) => {
          return reject(processError(err));
        })
    })
  );
}

export function editTransaction(data, id) {
  return () => (
    new Promise((resolve, reject) => {
      Http.put(`/admin/transactions/${id}`, data)
        .then(() => {
          return resolve(data);
        })
        .catch((err) => {
          return reject(processError(err));
        })
    })
  );
}

export function updateTransactionStatus(id, data) {
  return () => (
    new Promise((resolve, reject) => {
      Http.put(`/admin/transactions/${id}/update-status`, Transformer.send(data))
        .then(() => {
          return resolve(data);
        })
        .catch((err) => {
          return reject(processError(err));
        })
    })
  );
}
