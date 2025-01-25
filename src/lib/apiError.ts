import { errorResponseMessage as errorResponse } from './errorResponseMessage';

/**
 * @class API Error class.
 */

 class ApiError extends Error {
  private _status: number;
  private _code: string;

  constructor(message: string, status: number, code: string) {
    super(message);
    this._status = status;
    this._code = code;
    Object.setPrototypeOf(this, ApiError.prototype); // to ensure instanceof works
  }

  /**
   * Sends error JSON to response stream.
   * @param {Response} res Server response.
   */
  send(res: any): void {
    // set status
    res.status(this._status || 500);

    // send JSON
    res.json({
      isError: true,
      code: this._code || errorResponse.INTERNAL_ERROR,
      message: this.message,
    });
  }

  /**
   * @return {JSON} error.
   */
  get(): { isError: boolean; status: number; code: string; message: string } {
    // return JSON
    return {
      isError: true,
      status: this._status || 500,
      code: this._code || errorResponse.INTERNAL_ERROR,
      message: this.message,
    };
  }
}


export { ApiError };
