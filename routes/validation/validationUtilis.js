module.exports.validateRequest = (schema, req, res, next) => {
    const errors = schema.validate(req.body);
    if (errors.length == 0) {
        next();
    } else {
        let mappedErrors = {};
        errors.forEach(err => {
            mappedErrors[err.path] = err.message;
        })
        return res.status(400).json(mappedErrors);
    }
}
// Regex taken from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
module.exports.isEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

module.exports.isValidDate = date => {
    if (Number.isNaN((Date.parse(date))))
        return false;
    return true;
}