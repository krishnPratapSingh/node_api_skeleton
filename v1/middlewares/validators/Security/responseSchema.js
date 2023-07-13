const security = {
  error: {
    type: "object",
    properties: {
      httpStatusCode: { type: "number" },
      errorMessage: { type: "string" },
      errorCode: { type: "string" },
      errorData: { type: "object" },
    },
  },
  login: {
    type: "object",
    properties: {
      _id: { type: "object", format: "mongoObjectId" },
      roles: {
        type: "array",
        items: { type: "string" },
      },
      username: { type: "string" },
      email: { type: "string", format: "email" },
      first_name: { type: "string" },
      last_name: { type: "string" },
      api_token: { type: "string" },
      httpStatusCode: { type: "number" },
    },
    required: [
      "_id",
      "roles",
      "username",
      "email",
      "first_name",
      "last_name",
      "api_token",
    ],
    additionalProperties: false,
  },
  verifyToken: {
    type: "object",
    properties: {
      _id: { type: "object", format: "mongoObjectId" },
      roles: {
        type: "array",
        items: { type: "string" },
        minItems: 1,
      },
      username: { type: "string" },
      email: { type: "string", format: "email" },
      first_name: { type: "string" },
      last_name: { type: "string" },
      api_token: { type: "string" },
      httpStatusCode: { type: "number" },
    },
    required: [
      "_id",
      "roles",
      "username",
      "email",
      "first_name",
      "last_name",
      "api_token",
    ],
    additionalProperties: false,
  },
};

// export default security;

export const login = security.login;
export const verifyToken = security.verifyToken;
export const error = security.error;
