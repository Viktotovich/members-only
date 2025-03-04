const indexRouter = require("express").Router();
const { validateSignUp } = require("../validators/validators");

const {
  getIndex,
  getLogIn,
  postLogIn,
  getRegister,
  postRegister,
  getLogInFail,
  getLogInSuccess,
  getLogout,
  getProtectedRoute,
} = require("../controllers/indexController");

indexRouter.get("/", getIndex);
indexRouter.get("/login", getLogIn);
indexRouter.post("/login", postLogIn);
indexRouter.get("/register", getRegister);
indexRouter.post("/register", [validateSignUp, postRegister]);
indexRouter.get("/login-failure", getLogInFail);
indexRouter.get("/login-success", getLogInSuccess);
indexRouter.get("/protected-route", getProtectedRoute);
indexRouter.get("/logout", getLogout);

module.exports = indexRouter;
