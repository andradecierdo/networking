import Http from '../../../utils/Http'
import * as authActions from '../../auth/store/actions'
import Transformer from '../../../utils/Transformer'
import {processError} from "../../../common/error"

/**
 * login user
 *
 * @param credentials
 * @returns {function(*)}
 */
export function login(credentials) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post('admin/auth/login', credentials)
        .then(res => {
          const data = Transformer.fetch(res.data)
          dispatch(authActions.authLogin(data.accessToken))
          return resolve()
        })
        .catch((err) => {
          const error = processError(err);
          return reject(error);
        })
    })
  )
}
