const passport = require("passport");
const { loginStrategy, registerStrategy } = require("./strategies/localStrategy.js");

const passportInitialize = () => {
  passport.use("login", loginStrategy);
  passport.use("registrer",registerStrategy)

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};

module.exports = passportInitialize