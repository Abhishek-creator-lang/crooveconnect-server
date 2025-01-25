// const ApiError = require('./ApiError');
// const errors = require('./errors');
// const logger = require('./logger');
// const _ = require('lodash');
// const {v4: uuidv4} = require('uuid');
// const config = require('./config')();
// const knex = require('./knex');

import { ApiError } from "./apiError";
import { errors } from './error'
const _ = require('lodash');
/**
 * Express error handler middleware.
 * Should be the last middleware used.
 *
 * @param {Error|*} err Error value
 * @param {Request} req Express request
 * @param {Response} res Express response
 * @param {Function} next Next function
 */
async function errorHandler(err, req, res, next) {
  console.log('hey 1234')
  if (res.headersSent) {
    // end if headers have already been sent
    console.log('inside')
    res.end();
  } else {
    // send error
    if (err instanceof ApiError) {
      // send API error
    //   logger.error(errorFormatter(err, req));
    //   const errorId = await saveErrorLogs(err, req);
    //   err.errorId = errorId;
    console.log('inside')
      err.send(res);
    } else {
      // log internal error
    //   logger.error(errorFormatter(err, req));
    //   const errorId = await saveErrorLogs(err, req);
console.log("outside")
      // send default API error
      const details = inspectDetail(err);
      const defaultError = errors.INTERNAL(details);
    //   defaultError.errorId = errorId;
      defaultError.send(res);
    }
  }
}

/**
 * Inspect err object and return related error detail if any.
 *
 * @param {*} err - error to inspect.
 * @return {Object} error details, or undefined.
 */
function inspectDetail(err) {
  if (err instanceof Error && _.has(err, 'message')) {
    return err.message;
  }

  // return default detail
  return 'Unknown Error';
}



export { errorHandler };