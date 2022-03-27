
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");

function updateProductValidationRules() {
  return [
    check("_id")
            .trim()
            .escape()
            .notEmpty()
            .custom(
                (_id) => mongoose.isValidObjectId(_id)
            )
            .withMessage(
              "Please enter a valid product Id."
            ),
    check("name")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 5 })
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
  validateUpdateProduct: [updateProductValidationRules(), validationHandler],
};