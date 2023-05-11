const security = {
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

export default security;
