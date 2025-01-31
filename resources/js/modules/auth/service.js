import Http from '../../utils/Http'
import * as authActions from './store/actions'
import Transformer from '../../utils/Transformer'
import {unsetUser} from '../../modules/user/store/actions'
import {processError} from "../../common/error"

/**
 * fetch the current logged in user
 *
 * @returns {function(*)}
 */
export function fetchUser() {
  return dispatch => {
    return Http.get('auth/user')
      .then(res => {
        const data = Transformer.fetch(res.data);
        dispatch(authActions.authUser(data))
      })
      .catch(err => {
        console.log(err)
      })
  }
}

/**
 * login user
 *
 * @param credentials
 * @returns {function(*)}
 */
export function login(credentials) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post('auth/login', credentials)
        .then(res => {
          const data = Transformer.fetch(res.data)
          dispatch(authActions.authLogin(data.accessToken))
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
          //     errors: err.response.data.errors,
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

export function register(credentials) {
  return () => (
    new Promise((resolve, reject) => {
      Http.post('auth/register', Transformer.send(credentials))
        .then(res => {
          const data = Transformer.fetch(res.data)
            // console.log('register', data);
          // dispatch(authActions.authLogin(data.accessToken))
          return resolve()
        })
        .catch((err) => {
          const error = processError(err);
          // const statusCode = err.response.status;
          // const data = {
          //   error: null,
          //   statusCode,
          // };
          //
          // if (statusCode === 422) {
          //   const resetErrors = {
          //     errors: err.response.data.errors,
          //     replace: false,
          //     searchStr: '',
          //     replaceStr: '',
          //   };
          //   data.error = Transformer.resetValidationFields(resetErrors);
          // } else if (statusCode === 401) {
          //   data.error = err.response.data.message;
          // }
          // console.log(data)
          // return reject(data);
          console.log(error)
          return reject(error);
        })
    })
  )
}

/**
 * logout user
 *
 * @returns {function(*)}
 */
export function logout() {
  return dispatch => {
    return Http.delete('auth/logout')
      .then(() => {
        dispatch(authActions.authLogout())
        dispatch(unsetUser());
      })
      .catch(err => {
        console.log(err)
      })
  }
}

// function processError(error) {
//   const statusCode = error.response.status;
//   const data = {
//     error: null,
//     statusCode,
//   };
//
//   if (statusCode === 422) {
//     const resetErrors = {
//       errors: error.response.data.errors,
//       replace: false,
//       searchStr: '',
//       replaceStr: '',
//     };
//     data.error = Transformer.resetValidationFields(resetErrors);
//   } else if (statusCode === 401) {
//     data.error = error.response.data.message;
//   }
//
//   return data;
// }
