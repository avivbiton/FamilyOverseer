const passport = require("passport");

const authenticate = (req, res, next) => {
    // apply any custom authentication here.
    // TODO: Support for invalidating jwt tokens
    // empty so for now just calling next();
    next();
}

const authMiddleware = [
    authenticate,
    passport.authenticate("jwt", { session: false })
];

authMiddleware.unsignToken = (token) => {
    //TODO: make the token unavailable to use (useful on logout)
}

module.exports = authMiddleware;