import Transformer from "../../utils/Transformer";

export function processError(error) {
  const statusCode = error.response.status;
  const data = {
    error: null,
    statusCode,
  };

  if (statusCode === 422) {
    const resetErrors = {
      errors: error.response.data.errors,
      replace: false,
      searchStr: '',
      replaceStr: '',
    };
    data.error = Transformer.resetValidationFields(resetErrors);
  } else if (statusCode === 401) {
    data.error = error.response.data.message;
  }

  return data;
}
