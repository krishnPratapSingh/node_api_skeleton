const schema = {
  monthlyEventsCount: {
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
    additionalProperties: false,
  },
};

export default schema;
