const passport = require("passport");
const passwordUtils = require("../lib/passwordUtils");
const db = require("../db/queries");
const links = require("../links");
const { validationResult } = require("express-validator");

module.exports.getIndex = async (req, res) => {
  const title = "Welcome to the index page";
  const posts = await db.getAllMessages();
  const isAdmin = false;
  const approved = false;
  res.render("pages/index", { title, links, posts, isAdmin, approved });
};

module.exports.getLogIn = (req, res, next) => {
  const title = "Login into your profile";
  res.render("pages/login", { title, links });
};

module.exports.postLogIn = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/login-failure");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      return res.redirect("/login-success");
    });
  })(req, res, next);
};

module.exports.getRegister = (req, res, next) => {
  const title = "Create a new account";
  res.render("pages/register", { title, links });
};

module.exports.postRegister = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("pages/register", {
      title: "Registration Failed",
      errors: errors.array(),
    });
  }

  const { firstName, lastName, username } = req.body;
  const fullName = firstName + " " + lastName;
  const saltHash = passwordUtils.genPassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  await db.addNewUser(fullName, "Not a Member", username, hash, salt);
  res.redirect("/login");
};

module.exports.getLogInSuccess = (req, res, next) => {
  const title = "Login Success!";
  res.render("pages/login-success", { title });
};

module.exports.getLogInFail = (req, res, next) => {
  res.send("You entered a wrong username or password, please try again");
};

module.exports.getLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

//TODO: DELETE THIS AS IT IS REPLACED BY GETMYPROFILE
module.exports.getProtectedRoute = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.send(
      "<h1>You are authenticated</h1><p><a href='/logout'>Logout and reload</a></p>",
    );
  } else {
    res.send(
      "<h1>You are not authenticated!</h1><p><a href='/login'>Login</a></p>",
    );
  }
};
