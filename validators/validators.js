const { body, validationResult } = require("express-validator");
const softErrors = require("./softErrors");

const validateSignUp = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(softErrors.alpha("First name"))
    .isLength({ min: 2, max: 35 })
    .withMessage(softErrors.length("First name", 2, 35)),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(softErrors.alpha("Last name"))
    .isLength({ min: 2, max: 35 })
    .withMessage(softErrors.length("Last name", 2, 35)),
  body("username")
    .trim()
    .isAlphanumeric()
    .withMessage(softErrors.format("Username", "Jackie-12, or xY2Kx."))
    .isLength({ min: 3, max: 70 })
    .withMessage(softErrors.length("Username", 3, 70)),
  //TODO: custom validator not taken
];
