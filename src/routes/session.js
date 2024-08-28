const { Router } = require("express");
const passport = require("passport");

const router = Router();

router.get("/", (req, res) => {
	res.send("Pruebas con OAuth2.0");
});

router.get("/current", (req, res) => {
	if (req.user) {
		return res.json({
			message: "Welcome!",
			user: req.user,
		});
	}
	res.redirect("/session/failed");
});

router.get("/failed", (req, res) => {
	res.send("Operation failed");
});

router.post(
	"/login",
	passport.authenticate("login", {
		failureRedirect: "failed",
		successRedirect: "current",
	})
);
router.post(
	"/register",
	passport.authenticate("register", {
		failureRedirect: "failed",
		successRedirect: "/session",
	})
);

router.get(
	"/github",
	passport.authenticate("github", { scope: ["user:email"], failureRedirect: "failed" })
);

router.get(
	"/github/callback",
	passport.authenticate("github", {
		failureRedirect: "failed",
		successRedirect: "/session/current",
	})
);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
	"/google/callback",
	passport.authenticate("google", {
		failureRedirect: "failed",
		successRedirect: "/session/current",
	})
);

module.exports = router;
