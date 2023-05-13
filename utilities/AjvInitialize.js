import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({ removeAdditional: "all" });

addFormats(ajv);

// Define the custom format for validating MongoDB ObjectId using Mongoose
ajv.addFormat("mongoObjectId", {
  validate: (data) => {
    const mongoose = require("mongoose");
    return mongoose.isValidObjectId(data);
  },
});
export default ajv;
