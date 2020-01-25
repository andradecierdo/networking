import Http from '../../utils/Http'
import Transformer from '../../utils/Transformer'
import * as userActions from './store/actions'
import {processError} from "../../common/error"

export function userUpdateRequest(params) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.patch(`/users/${params.id}`, Transformer.send(params))
        .then(res => {
          dispatch(userActions.userUpdate(Transformer.fetch(res.data)))
          return resolve()
        })
        .catch((err) => {
          const error = processError(err);
          return reject(error);
        })
    })
  )
}

export function fetchAllChildren({page, limit}) {
  return () => (
    new Promise((resolve, reject) => {
      Http.get('/users', {
        params: {page, limit},
      })
        .then(result => resolve(Transformer.fetch(result.data)))
        .catch(error => reject(error))
    })
  );
}


//TODO temp
export function fetchCodes() {
  return () => (
    new Promise((resolve, reject) => {
      Http.get('/admin/registration-codes/generate')
        .then(result => resolve(Transformer.fetch(result.data)))
        .catch(error => reject(error))
    })
  );
}
