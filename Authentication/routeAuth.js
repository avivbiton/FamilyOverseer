const passport = require("passport");

const authenticate = (req, res, next) => {
    // apply any custom authentication here.
    // TODO: Support for invalidating jwt tokens
    // empty so for now just calling next();
    next();
}

const passportAuth = (req, res, next) => {
    return passport.authenticate("jwt", { session: false }, (err, user, info) => {
        if (err || !user) return res.status(400).json({ error: "You are not authorized to be able to do this." })
        req.user = user;
        return next();
    })(req, res, next);
}

const authMiddleware = [
    authenticate,
    passportAuth
];

authMiddleware.unsignToken = (token) => {
    //TODO: make the token unavailable to use (useful on logout)
}

module.exports = authMiddleware;