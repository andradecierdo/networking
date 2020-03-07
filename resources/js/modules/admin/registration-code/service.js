import Http from '../../../utils/Http'
import Transformer from '../../../utils/Transformer'
import QueryString from "query-string";
import {processError} from "../../../common/error";

export function generateCodes() {
  return () => (
    new Promise((resolve, reject) => {
      Http.get('/admin/registration-codes/generate')
        .then(result => resolve(Transformer.fetch(result.data)))
        .catch(error => reject(error))
    })
  );
}

export function fetchRegistrationCodes(params = null) {
  let queryParams = params ? `?${QueryString.stringify(params)}` : '';

  return dispatch => (
    new Promise((resolve, reject) => {
      Http.get(`/admin/registration-codes${queryParams}`)
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

export function searchRegistrationCodes(params = {}) {
  return () => (
    new Promise((resolve, reject) => {
      Http.get(`/admin/registration-codes/search`, {params})
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

export function deleteRegistrationCode(id) {
  return () => (
    new Promise((resolve, reject) => {
      return Http.delete(`/admin/registration-codes/${id}`)
        .then(res => {
          return resolve(res);
        })
        .catch(err => {
          return reject(processError(err));
        })
    })
  )
}
