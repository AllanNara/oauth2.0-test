const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const passport = require("passport");
const sessionRouter = require("./routes/session.js");
const passportInitialize = require("./passport/index.js");
const sequelize = require("./models/database.js");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		secret: "keyboard cat",
		resave: true,
		saveUninitialized: true,
	})
);
app.use(passport.initialize());
app.use(passport.session());
passportInitialize();

app.use("/session", sessionRouter);

sequelize.sync({ alter: true }).then(() => {
	console.log("All models were synchronized successfully.");
	app.listen(8080, () => {
		console.log("Server running on port 8080");
	});
});
