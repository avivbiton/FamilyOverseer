const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const vars = require("../app-vars");
const User = require("../models/UserModel");

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = vars.JWT_SECRET;

const strategy = new JwtStrategy(opts, (jwt_payload, done) => {
    User.findOne({ _id: jwt_payload.id }).then(user => {
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }).catch(error => done(error, false));
});

module.exports = strategy;