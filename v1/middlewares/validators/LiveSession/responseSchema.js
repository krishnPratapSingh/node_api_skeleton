const schema = {
  monthlyEventsCount: {
    type: "object",
    properties: {
      success: {
        type: "boolean",
      },
      data: {
        type: "array",
        items: [
          {
            type: "object",
            properties: {
              _id: {
                type: "object",
                properties: {
                  year: {
                    type: "integer",
                  },
                  month: {
                    type: "integer",
                  },
                },
              },
              numberOfEvents: {
                type: "integer",
              },
            },
          },
        ],
      },
      msg: { type: "string" },
    },
    required: ["success", "data"],
    additionalProperties: false,
  },
};

export default schema;
