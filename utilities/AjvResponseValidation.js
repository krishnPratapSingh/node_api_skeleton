import ajv from "./AjvInitialize";

const validateResponse = (req, res, next) => {
  // compiling schema
  const validate = ajv.compile(res.schema);
  const data = res.data;
  // validating data
  const isValid = validate(data);
  if (!isValid) {
    const errors = validate.errors;
    console.log("Validation errors:", errors);
    return res
      .status(500)
      .json({
        success: false,
        error: "Invalid response data",
        httpStatusCode: 500,
      });
  }
  data.httpStatusCode = 200;
  res.json(data);
};

export default validateResponse;
