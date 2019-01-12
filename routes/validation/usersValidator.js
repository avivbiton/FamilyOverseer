const Schema = require("validate");

// Regex taken from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
const isEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const registrationValidation = new Schema({

    firstName: {
        type: String,
        required: true,
        length: { min: 2, max: 10 },
        message: {
            required: "Please fill your first name",
            length: "First name must be between 2 to 10 characters"
        }
    },
    lastName: {
        type: String,
        required: true,
        length: { min: 2, max: 10 },
        message: {
            required: "Please fill your last name",
            length: "Last name must be between 2 to 10 characters"
        }
    },
    email: {
        type: String,
        required: true,
        message: {
            required: "Email field can not be empty.",
            isEmail: "Invalid Email."
        },
        use: { isEmail }
    },
    password: {
        type: String,
        required: true,
        length: { min: 6, max: 20 },
        message: {
            required: "Password is required.",
            length: "Password must be between 6 to 20 characters"
        }
    }
});

const loginValidation = new Schema({
    email: {
        type: String,
        required: true,
        message: {
            required: "Email field can not be empty.",
            isEmail: "Invalid Email."
        },
        use: { isEmail }
    },
    password: {
        type: String,
        required: true,
        length: { min: 6, max: 20 },
        message: {
            required: "Password is required.",
            length: "Password must be between 6 to 20 characters"
        }
    }

});

const validateRequest = (schema, req, res, next) => {
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


module.exports.validateRegistration = (req, res, next) => {
    validateRequest(registrationValidation, req, res, next);
}

module.exports.validateLogin = (req, res, next) => {
    validateRequest(loginValidation, req, res, next);
}






