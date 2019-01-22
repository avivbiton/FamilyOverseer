//require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const vars = require("./app-vars");
const path = require("path");
const passport = require("passport");
const passportAuth = require("./Authentication/passportAuth");


const usersRouter = require("./routes/users");
const groupsRouter = require("./routes/groups");

const app = express();

//#region middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

if (vars.NODE_ENV == "Production") {
  app.use(express.static(path.join(__dirname, "frontend", "build")));
}

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
app.use("/api/groups", groupsRouter);
//#endregion


if (vars.NODE_ENV == "Production") {
  app.get("*", (req, res) => {

    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));

  });
}

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server is running on port ${vars.SERVER_PORT}`)
);



module.exports = app;
