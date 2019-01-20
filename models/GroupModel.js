const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = {
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

Group.methods.hasMember = function (userId) {
    return this.members.findIndex(member => member.toString() == userId.toString()) == -1 ? false : true;
}

Group.methods.isUserInvited = function (userId) {
    return this.invites.findIndex(inv => inv.toString() == userId.toString()) === -1 ? false : true;
}

Group.methods.removeMember = function (userId) {
    const index = this.members.findIndex(member => member.toString() == userId.toString());
    if (index !== -1) {
        this.members.splice(index, 1);
    }
}

Group.methods.createTask = function (taskText) {
    const newTask = {
        text: taskText,
        startDate: Date.now(),
        completed: false
    }

    return newTask;
}

module.exports = Group = mongoose.model("groups", Group);

