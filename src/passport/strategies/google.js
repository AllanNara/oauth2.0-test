const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const User = require("../../models/User.js");
const { GOOGLE } = require("../../config/index.js");

const googleStrategy = new GoogleStrategy(
  {
    clientID: GOOGLE.CLIENT_ID,
    clientSecret: GOOGLE.CLIENT_SECRET,
    callbackURL: "http://localhost:8080/session/google/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile._json.email || profile.emails[0].value;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        const [first_name, last_name] = profile._json.name.split(" ");
        const newUser = await User.create({
          first_name,
          last_name,
          email,
          password: null,
        });
        return done(null, newUser);
      }
      done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);

module.exports = {
  googleStrategy
}