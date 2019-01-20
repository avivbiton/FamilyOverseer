const Schema = require("validate");
const utilis = require("./validationUtilis");


const isEmail = utilis.isEmail;
const isValidDate = utilis.isValidDate;

const groupCreationValidator = new Schema({

    name: {
        type: String,
        required: true,
        length: { min: 3, max: 15 },
        message: {
            required: "Group name can not be empty.",
            length: "Name may only contains 3 to 15 characters."
        }
    },
});

const groupInviteValidator = new Schema({

    userEmail: {
        type: String,
        use: { isEmail },
        required: true,
        message: {
            required: "Please enter the user's email.",
            isEmail: "You've entered an invalid email address."
        }
    }
});

const groupAddTaskValidator = new Schema({
    text: {
        type: String,
        required: true,
        message: {
            required: "Please enter task description",
        }
    },
    dueDate: {
        type: String,
        required: false,
        use: { isValidDate },
        message: "Please enter a valid date format"
    }
});



module.exports.creation = (req, res, next) => {
    utilis.validateRequest(groupCreationValidator, req, res, next);
}

module.exports.addTask = (req, res, next) => {
    utilis.validateRequest(groupAddTaskValidator, req, res, next);
}

module.exports.invite = (req, res, next) => {
    utilis.validateRequest(groupInviteValidator, req, res, next);
}