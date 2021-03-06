const Schema = require("validate");
const utilis = require("./validationUtilis");

const isEmail = utilis.isEmail;

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


module.exports.validateRegistration = (req, res, next) => {
    utilis.validateRequest(registrationValidation, req, res, next);
}

module.exports.validateLogin = (req, res, next) => {
    utilis.validateRequest(loginValidation, req, res, next);
}






