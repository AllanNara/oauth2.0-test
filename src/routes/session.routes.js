const { Router } = require("express");
const passport = require("passport");

const router = Router();

router.get("/", (req, res) => {
  res.send("Pruebas con OAuth2.0");
})

router.get("/profile", (req, res) => {
  if(req.user) {
    return res.json({
      message: "Welcome!",
      user: req.user
    })
  }
  res.redirect("/login");
})

router.get("/failed", (req, res) => {
  res.send("Operation failed");
})

router.post("/login", passport.authenticate("login", { failureRedirect: "/failed", successRedirect: "/profile" }))
router.post("/register", passport.authenticate("register", { failureRedirect: "/failed", successRedirect: "/login" }))

module.exports = router