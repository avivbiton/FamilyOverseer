require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const vars = require("./app-vars");
const passport = require("passport");
const passportAuth = require("./Authentication/passportAuth");


const usersRouter = require("./routes/users");

const app = express();

//#region middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
//#endregion

// passport authencation
passport.use(passportAuth);

mongoose.connect(vars.DB_URI, error => {
  if (error)
    return console.log(`Unable to connect to the database. (ERROR: ${error})`);
  console.log("Database connection established");
});

//#region use routes
app.use("/api/users", usersRouter);
//#endregion

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  if (err.statusCode == 404) {
    return res.status(404).json({ 404: "Route not found" });
  }
  return res.status(500).json({ error: "Internal server error" });
});

app.listen(vars.SERVER_PORT, () =>
  console.log(`Server is running on port ${vars.SERVER_PORT}`)
);

module.exports = app;
