const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let User = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  groups: [{
    type: Schema.Types.ObjectId,
    ref: "groups"
  }],
  invites: [{
    type: Schema.Types.ObjectId,
    ref: "groups"
  }]

});

module.exports = User = mongoose.model("users", User);
