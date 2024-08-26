const { hashPassword, validatePassword } = require("../../utils.js");
const { Strategy: LocalStrategy } = require("passport-local");
const User = require("../../models/User");

const loginStrategy = new LocalStrategy({usernameField: "email"}, (email, password, done) => {
  User.findOne({ where: { email } })
    .then((user) => {
      if (!user) {
        console.log({ message: "Email not found" })
        return done(null, false);
      }
      if (!validatePassword(password, user.password)) {
        console.log({ message: "Incorrect password" })
        return done(null, false);
      }
      return done(null, user);
    })
    .catch(done);
});

const registerStrategy = new LocalStrategy({usernameField: "email"}, (email, password, done) => {
  User.create({ email, password: hashPassword(password) })
    .then((user) => done(null, user))
    .catch(done);
});

module.exports = {
  loginStrategy,
  registerStrategy
}