const { GITHUB } = require("../../config/index.js");
const { Strategy: GithubStrategy } = require("passport-github2");
const User = require("../../models/User.js");

const githubStrategy = new GithubStrategy(
	{
		clientID: GITHUB.CLIENT_ID,
		clientSecret: GITHUB.CLIENT_SECRET,
		callbackURL: "http://localhost:8080/session/github/callback",
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
			console.log({error})
			return done(error);
		}
	}
);

module.exports = {
	githubStrategy,
};
