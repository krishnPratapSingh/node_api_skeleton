import SafeError from "./SafeError";
import ErrorMessages from "./ErrorMessages";

/**
 * Create custom error dynamically base on ./ErrorMessages.js
 * EXAMPLE: throw new Errors.JWT_EXPIRED()
 */
const Errors = Object.entries(ErrorMessages).reduce((errors, [k, v]) => {
  const name = k;
  errors[k] = class k extends SafeError {
    constructor(
      message = v.message,
      success = v.success,
      httpStatusCode = v.httpStatusCode
    ) {
      super({
        success: success,
        message: message,
        httpStatusCode: httpStatusCode,
      });
    }
  };
  return errors;
}, {});

export default Errors;
