const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const vars = require("../app-vars");
const authUser = require("../Authentication/routeAuth");
const inputValidation = require("./validation/usersValidator");


router.post("/register", inputValidation.validateRegistration, (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  });

  const password = req.body.password;

  User.findOne({ email: user.email })
    .then(foundUser => {
      if (foundUser)
        return res.status(400).json({ email: "Email is already taken" });

      bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(password, salt).then(hash => {
          user.password = hash;
          user.save().then(() => { return res.json(user); });

        }).catch(error => res.status(500).json({ error: "Failed to bcrypt password" }));
      });
    }).catch(error => res.status(500).json({ error: "Internal server error" }));
});

router.post("/login", inputValidation.validateLogin, (req, res) => {

  const { email, password } = req.body;

  User.findOne({ email: email }).then(foundUser => {
    if (!foundUser) return res.status(404).json({ email: "Email not found" });

    // verify password
    bcryptjs.compare(password, foundUser.password).then(valid => {
      if (valid == false) return res.status(400).json({ password: "Invalid password" });
      signJwt(foundUser, (error, token) => {
        return res.json({ success: true, token: `bearer ${token}` });
      });
    })
  });
})

router.get("/current", authUser, (req, res) => {
  return res.json({
    id: req.user._id,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    groups: req.user.groups
  });
});


router.get("/groups", authUser, (req, res) => {

  req.user.populate("groups", (err, response) => {
    if (err) return res.status(400).json(err);
    return res.json({ groups: response.groups });
  });

});

const signJwt = (user, cb) => {
  const payload = {
    id: user.id
  }
  jwt.sign(payload, vars.JWT_SECRET, { expiresIn: 3600 }, cb);
}

module.exports = router;
