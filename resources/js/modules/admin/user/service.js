import QueryString from 'query-string'
import Http from '../../../utils/Http'
import Transformer from '../../../utils/Transformer'
import {processError} from "../../../common/error"

export function fetchUsers(params = null) {
  let queryParams = params ? `?${QueryString.stringify(params)}` : '';

  return () => (
    new Promise((resolve, reject) => {
      Http.get(`/admin/users${queryParams}`)
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

export function searchUsers(params = {}) {
  return () => (
    new Promise((resolve, reject) => {
      Http.get(`/admin/users/search`, {params})
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

export function fetchUserDetail(id) {
  return () => (
    new Promise((resolve, reject) => {
      return Http.get(`/admin/users/${id}`)
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

export function deleteUser(id) {
  return () => (
    new Promise((resolve, reject) => {
      return Http.delete(`/admin/users/${id}`)
        .then(res => {
          return resolve(res);
        })
        .catch(err => {
          return reject(processError(err));
        })
    })
  )
}

export function addUser(data) {
  return () => (
    new Promise((resolve, reject) => {
      Http.post(`/admin/users`, Transformer.send(data))
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

export function editUser(data, id) {
  return () => (
    new Promise((resolve, reject) => {
      Http.put(`/admin/users/${id}`, Transformer.send(data))
        .then(() => {
          return resolve(data);
        })
        .catch((err) => {
          return reject(processError(err));
        })
    })
  );
}
