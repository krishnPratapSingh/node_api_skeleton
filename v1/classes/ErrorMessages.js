/**
 * Define cusom errors
 */
const ErrorMessages = Object.freeze({
  UNKNOWN: { status: 500, message: "Unknown server error" },
  UNKNOWN_DB: { status: 500, message: "Unknown DB error" },
  UNAUTHORIZED: { status: 401, message: "Unauthorized" },
  NOT_ENOUGH_PERMISSION: {
    success: false,
    msg: "Dont have enough permission to perform this action",
    httpStatusCode: 403,
  },
  JWT_INVALID: {
    success: false,
    message: "Invalid Token",
    httpStatusCode: 401,
  },
  JWT_EXPIRED: {
    success: false,
    message: "Token expired",
    httpStatusCode: 401,
  },
  NO_TOKEN: { status: 403, message: "No token provided" },
  INVALID_AUTH_HEADER: {
    success: false,
    message: "Missing `authorization` header",
    httpStatusCode: 401,
  },
  OLD_PWD_NOT_VALID: { status: 500, message: "Old password not valid" },
  PWD_ADMIN_NOT_VALID: { status: 500, message: "Password admin not valid" },
  INVALID_LOGIN: { status: 401, message: "Not Authorized" },
  INVALID_BODY: { status: 400, message: "Invalid JSON body" },
  INVALID_QUERY: { status: 400, message: "Invalid query string" },
});

export default ErrorMessages;
