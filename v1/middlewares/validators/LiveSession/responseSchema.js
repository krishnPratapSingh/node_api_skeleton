const schema = {
  monthlyEventsCount: {
    type: "object",
    properties: {
      name: { type: "string" },
      age: { type: "number" },
      address: {
        type: "object",
        properties: {
          city: { type: "string" },
          locality: { type: "string" },
          pinCode: { type: "number" },
        },
        required: ["city", "locality", "pinCode"],
      },
    },
    required: ["name", "age", "address"],
  },
};
