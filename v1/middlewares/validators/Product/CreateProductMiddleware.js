
const { check, validationResult } = require("express-validator");

function createProductValidationRules() {
  return [
    check("name")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please input a valid product name."),
    check("quantity")
      .isNumeric()
      .withMessage("Please input a valid quantity."),
    check("sku")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 8, max: 8 })
      .withMessage("Please input a valid sku."),
  ];
}

function validationHandler(request, response, next) {
  const errors = validationResult(request);
  if (errors.isEmpty()) {
    return next();
  }

  return response.status(422).json({ errors: errors.array() });
}

module.exports = {
  validateCreateProduct: [createProductValidationRules(), validationHandler],
};