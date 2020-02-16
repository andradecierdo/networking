import Http from '../../../utils/Http'
import Transformer from '../../../utils/Transformer'

export function generateCodes() {
  return () => (
    new Promise((resolve, reject) => {
      Http.get('/admin/registration-codes/generate')
        .then(result => resolve(Transformer.fetch(result.data)))
        .catch(error => reject(error))
    })
  );
}
