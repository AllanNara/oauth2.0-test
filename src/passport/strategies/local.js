const { hashPassword, validatePassword } = require("../../utils.js");
const { Strategy: LocalStrategy } = require("passport-local");
const User = require("../../models/User.js");

const loginStrategy = new LocalStrategy(
	{ usernameField: "email" },
	(email, password, done) => {
		User.findOne({ where: { email } })
			.then((user) => {
				if (!user) {
					console.log({ message: "Email not found" });
					return done(null, false);
				}
				if (!user.password) {
					console.log({ message: "Password not found" });
					return done(null, false);
				}
				if (!validatePassword(password, user.password)) {
					console.log({ message: "Incorrect password" });
					return done(null, false);
				}
				return done(null, user);
			})
			.catch(done);
	}
);

const registerStrategy = new LocalStrategy(
	{ usernameField: "email", passReqToCallback: true },
	(req, email, password, done) => {
		const { first_name, last_name, age, role } = req.body;
		User.create({
			first_name,
			last_name,
			age,
			role,
			email,
			password: hashPassword(password),
		})
			.then((user) => done(null, user))
			.catch(done);
	}
);

module.exports = {
	loginStrategy,
	registerStrategy,
};
