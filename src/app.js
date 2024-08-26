const express = require("express");
const morgan = require("morgan")
const session = require("express-session")
const sessionRouter = require("./routes/session.routes.js")

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: "keyboard cat",
  resave: true,
  saveUninitialized: true
}));

app.use("/session", sessionRouter)

app.listen(8080, () => {
  console.log("Server running on port 8080");
})