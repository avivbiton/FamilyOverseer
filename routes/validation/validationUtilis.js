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