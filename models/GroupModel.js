const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = {
    id: Schema.Types.ObjectId,
    startDate: Date, text: String, dueDate: Date, completed: Boolean,
    createdby: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    completedBy: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
}

let Group = new Schema({
    name: {
        type: String,
        required: true
    },
    activeTasks: [taskSchema],
    archivedTasks: [taskSchema],
    members: [{
        type: Schema.Types.ObjectId,
        ref: "users"
    }],
    invites: [{
        type: Schema.Types.ObjectId,
        ref: "users"
    }]

});

module.exports = Group = mongoose.model("groups", Group);

