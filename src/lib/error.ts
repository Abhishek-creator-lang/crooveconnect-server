import { ApiError } from './apiError';
import { errorCodes } from './errorConstant';

const { mapValues } = require('lodash');

// Transform error value into error functions
export const errors = mapValues(errorCodes, (val, key) => {
  return message => new ApiError(message || val.message, val.status, key);
});
