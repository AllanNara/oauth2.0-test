const passport = require("passport");
const { loginStrategy, registerStrategy } = require("./strategies/local.js");
const { githubStrategy } = require("./strategies/github.js");
const { googleStrategy } = require("./strategies/google.js");

const passportInitialize = () => {
  passport.use("login", loginStrategy);
  passport.use("register",registerStrategy)
  passport.use("github", githubStrategy)
  passport.use("google", googleStrategy)

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};

module.exports = passportInitialize