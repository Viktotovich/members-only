const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { getUserById, getUserByUname } = require("../db/queries");
const { validatePassword } = require("../lib/passwordUtils");

const verifyCallback = async (username, password, done) => {
  const user = await getUserByUname(username);

  if (!user) {
    return done(null, false);
  }

  const isValid = validatePassword(password, user.hash, user.salt);

  if (isValid) {
    return done(null, user);
  } else {
    return done(null, false);
  }
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await getUserById(userId);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
