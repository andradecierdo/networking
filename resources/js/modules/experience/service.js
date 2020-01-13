import Http from '../../utils/Http'
import Transformer from '../../utils/Transformer'
import * as experienceActions from './store/actions'
import {processError} from "../../common/error"

function transformRequest(parms) {
  return Transformer.send(parms)
}

function transformResponse(params) {
  return Transformer.fetch(params)
}

export function experienceAddRequest(params) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post('/experiences', transformRequest(params))
        .then(res => {
          dispatch(experienceActions.add(transformResponse(res.data)))
          return resolve()
        })
        .catch((err) => {
          // const statusCode = err.response.status;
          // const data = {
          //   error: null,
          //   statusCode,
          // };
          //
          // if (statusCode === 422) {
          //   const resetErrors = {
          //     errors: err.response.data,
          //     replace: false,
          //     searchStr: '',
          //     replaceStr: '',
          //   };
          //   data.error = Transformer.resetValidationFields(resetErrors);
          // } else if (statusCode === 401) {
          //   data.error = err.response.data.message;
          // }
          const error = processError(err);
          return reject(error);
        })
    })
  )
}

export function experienceUpdateRequest(params) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.patch(`experiences/${params.id}`, transformRequest(params))
        .then(res => {
          dispatch(experienceActions.add(transformResponse(res.data)))
          return resolve()
        })
        .catch((err) => {
          // const statusCode = err.response.status;
          // const data = {
          //   error: null,
          //   statusCode,
          // };
          //
          // if (statusCode === 422) {
          //   const resetErrors = {
          //     errors: err.response.data,
          //     replace: false,
          //     searchStr: '',
          //     replaceStr: '',
          //   };
          //   data.error = Transformer.resetValidationFields(resetErrors);
          // } else if (statusCode === 401) {
          //   data.error = err.response.data.message;
          // }
          // return reject(data);
          const error = processError(err);
          return reject(error);
        })
    })
  )
}

export function experienceRemoveRequest(id) {
  return dispatch => {
    Http.delete(`experiences/${id}`)
      .then(() => {
        dispatch(experienceActions.remove(id))
      })
      .catch((err) => {
        console.error(err.response)
      })
  }
}

export function experienceListRequest({pageNumber = 1, url = '/experiences'}) {
  return dispatch => {
    if (pageNumber > 1) {
      url = url + `?page=${pageNumber}`
    }

    Http.get(url)
      .then((res) => {
        dispatch(experienceActions.list(transformResponse(res.data)))
      })
      .catch((err) => {
        console.error(err.response)
      })
  }
}

export function experienceEditRequest(id) {
  return dispatch => {
    Http.get(`experiences/${id}`)
      .then((res) => {
        dispatch(experienceActions.add(transformResponse(res.data)))
      })
      .catch((err) => {
        console.error(err.response)
      })
  }
}
