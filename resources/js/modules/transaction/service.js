import Http from '../../utils/Http'
import Transformer from '../../utils/Transformer'
import {processError} from "../../common/error"

export function register(transactionData) {
  return () => (
    new Promise((resolve, reject) => {
      Http.post('/transactions', Transformer.send(transactionData))
        .then(res => {
          const data = Transformer.fetch(res.data)
          return resolve(data)
        })
        .catch((err) => {
          const error = processError(err);
          return reject(error);
        })
    })
  )
}
