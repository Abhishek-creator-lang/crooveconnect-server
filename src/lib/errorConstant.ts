/**
 * Defined API errors.
 */
export const errorCodes = {
  VERSION_MISMATCH: {
    status: 400,
    code: 'VERSION_MISMATCH',
    message: 'API version mismatch!',
  },
  ENDPOINT_NOT_FOUND: {
    code: 'ENDPOINT_NOT_FOUND',
    status: 404,
    message: 'No such route exists!',
  },
  INTERNAL: {
    code: 'INTERNAL',
    status: 500,
    message: 'Internal server error!',
  },
  BAD_REQUEST: {
    code: 'BAD_REQUEST',
    status: 400,
    message: 'Bad Request!',
  },
  UNAUTHORIZED: {
    code: 'UNAUTHORIZED',
    status: 401,
    message: 'Unauthorized access!',
  },
  NOT_IMPLEMENTED: {
    code: 'NOT_IMPLEMENTED',
    status: 501,
    message: 'Resource method not implemented!',
  },
  INVALID_INPUT: {
    code: 'INVALID_INPUT',
    status: 400,
    message: 'Invalid input in request!',
  },
  INVALID_INPUT_FORMAT: {
    code: 'INVALID_INPUT_FORMAT',
    status: 400,
    message: 'Invalid input in format!',
  },
  INVALID_USER: {
    code: 'INVALID_USER',
    status: 400,
    message: 'Incorrect email or pasword!',
  },
  USER_NOT_FOUND: {
    code: 'USER_NOT_FOUND',
    status: 400,
    message: 'User details not found!',
  },
  USER_NOT_HAVE_PERMISSION: {
    code: 'USER_NOT_HAVE_PERMISSION',
    status: 400,
    message: 'User details not found!',
  },
  DETAILS_NOT_FOUND: {
    code: 'DETAILS_NOT_FOUND',
    status: 400,
    message: 'Details Not found!',
  },
  USER_ALREADY_EXIST: {
    code: 'USER_ALREADY_EXIST',
    status: 400,
    message: 'User already exist!',
  },
};
