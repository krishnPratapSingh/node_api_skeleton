
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");

function productIdValidationRules() {
  return [
    check("id")
            .custom(
                (id) => mongoose.isValidObjectId(id)
            )
            .withMessage(
              "Invalid Product Id."
            ),
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
  validateProductId: [productIdValidationRules(), validationHandler],
};