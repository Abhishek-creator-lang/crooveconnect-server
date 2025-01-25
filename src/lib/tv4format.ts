import { errorResponseMessage as errorResponse } from './errorResponseMessage';
const _ = require('lodash');

// A practical regex for RFC 2822 email spec. @see http://stackoverflow.com/a/1373724/1531054
const REGEX_EMAIL =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Extra formats for tv4 JSON schema validator. You can add your validators here as well.
 * @type {Object}
 */
export const tvFormat = {
  // anything parcelable to a valid Date Object
  date: (data) => {
    let valid = _.isFinite(data) || _.isString(data) || _.isDate(data);
    valid = valid && new Date(data).toString() !== 'Invalid Date';
    return valid ? null : errorResponse.DATE_ERROR;
  },

  // string with something to read. i.e not empy or blank
  nonEmptyOrBlank: (data) => {
    return data.length > 0 && !/^\s+$/.test(data) ?
      null :
      errorResponse.NON_EMPTY_OR_BLANK_ERROR;
  },

  // string parcelable to a number
  numberString: (data) => {
    return !isNaN(data) ? null : errorResponse.NUMBER_ERROR;
  },

  // true or false string
  booleanString: (data) => {
    return data === 'true' || data === 'false' ?
      null :
      errorResponse.BOOLEAN_ERROR;
  },

  // email address
  email: (data) => {
    return REGEX_EMAIL.test(data) ? null : errorResponse.INVALID_EMAIL;
  },

  mobileNumber: function(data) {
    return /^[0-9]{10,15}$/.test(data) ? null : errorResponse.INVALID_MOBILE_NO;
  },

  positiveNumeric: function(data) {
    return data >= 0 ? null : errorResponse.POSITIVE_NUMBER_ERROR;
  },
};
