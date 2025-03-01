const { body, validationResult } = require("express-validator");
const softErrors = require("./softErrors");
const db = require("../db/queries");

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
    .withMessage(softErrors.length("Username", 3, 70))
    .custom(duplicateUserCheck)
    .withMessage(softErrors.taken()),
];

async function duplicateUserCheck(value) {
  const user = await db.getUserByUname(value);
  if (user) {
    throw new Error("Username already taken.");
  }
}
