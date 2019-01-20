const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const GroupModel = require("../models/GroupModel");
const UserModel = require("../models/UserModel");

const authenticateUser = require("../Authentication/routeAuth");
const validateReq = require("./validation/groupsValidator");


const groupIsValid = (req, res, next) => {
    const groupId = req.params.id;
    try {
        if (mongoose.Types.ObjectId.isValid(groupId)) {
            GroupModel.findById(groupId).then(group => {
                if (group) {
                    req.group = group;
                    next();
                } else { throw "Group not found" }
            })
                .catch(err => { throw "group not found" });
        } else { throw "Gropu id is Invalid" }
    } catch (error) {
        res.status(404).json({ error: "Group ID not found." });
    }
}

const userIsGroupMember = (req, res, next) => {
    const { user, group } = req;
    if (group.hasMember(user._id) == false) return res.status(400).json({ error: "You may not operate on this group" });
    next();
}

const taskIsActive = (req, res, next) => {

    const taskId = req.params.taskId;
    const group = req.group;
    if (typeof taskId === "undefined") return res.status(400).json({ error: "Unable to retrive task ID" });

    const index = group.activeTasks.findIndex(t => t._id == taskId);
    if (index === -1)
        return res.status(404).json({ error: "This task is not active any more." })

    req.task = group.activeTasks[index];
    next();
}

router.post("/create", authenticateUser, validateReq.creation, (req, res) => {
    const name = req.body.name;
    const group = new GroupModel({
        name: name
    })

    group.members.push(req.user._id);
    group.save().then(groupSaved => {
        req.user.groups.push(groupSaved._id);
        req.user.save().then(user => res.json(groupSaved));
    }).catch(error => res.status(400).json(error));
});


/*
Invites a user to the group, and allow them to join.
*/
router.post("/:id/invite",
    authenticateUser,
    validateReq.invite,
    groupIsValid,
    userIsGroupMember,
    (req, res) => {
        const inviteEmail = req.body.userEmail;
        const { group, user } = req;

        // user is not inviting themselves
        if (user.email == inviteEmail) return res.status(400).json({ error: "You can not invite yourself!" });

        // find the user
        UserModel.findOne({ email: inviteEmail })
            .then(userFound => {
                if (!userFound) return res.status(404).json({ error: "Email not found" });

                if (group.isUserInvited(userFound._id))
                    return res.status(400).json({ error: "This user is already invited to the group" });

                if (group.hasMember(userFound._id))
                    return res.status(400).json({ error: "This user is already in the group" });

                group.invites.push(userFound._id);
                group.save().then(() => res.json({ success: "User is invited." }))
                    .catch(error => res.json(error));

            }).catch(err => res.json(err));
    });

// Leave the current the group
router.post("/:id/leave",
    authenticateUser,
    groupIsValid,
    userIsGroupMember,
    (req, res) => {
        const { user, group } = req;
        group.removeMember(user._id);
        if (group.members.length == 0) {
            group.remove();
            return res.json({ success: "You've left the group." });
        }
        group.save().then(() => res.json({ success: "You've left the group." }))
            .catch(error => res.status(400).json(error));
    });


// Allow user to join if they are invited beforehand
router.post("/:id/join",
    authenticateUser,
    groupIsValid,
    (req, res) => {
        const { group, user } = req;

        if (group.isUserInvited(user._id) == false)
            return res.status(400).json({ error: "You are not invited to this group." });

        const index = group.invites.findIndex(id => id.toString() == user._id.toString());
        group.invites.splice(index, 1);
        group.members.push(user._id);
        group.save().then(() => res.json({ success: `You've joined the group ${group.name}` }))
            .catch(error => res.status(400).json(error));

    });

// Decline invites to groups
router.post("/:id/decline",
    authenticateUser,
    groupIsValid,
    (req, res) => {

        const { group, user } = req;

        if (group.isUserInvited(user._id) == false)
            return res.status(400).json({ error: "You are not invited to this group." });

        const index = group.invites.findIndex(id => id.toString() == user._id.toString());
        group.invites.splice(index, 1);
        group.save().then(() => res.json({ success: `You've declined the invitation to the group ${group.name}` }))
            .catch(error => res.status(400).json(error));
    });

// Post new task to the group
router.post("/:id/task",
    authenticateUser,
    validateReq.addTask,
    groupIsValid,
    userIsGroupMember,
    (req, res) => {
        const { group, user } = req;

        const newTask = group.createTask(req.body.text);
        newTask.createdby = user._id;

        if (typeof req.body.dueDate !== "undefined")
            newTask.dueDate = req.body.dueDate;

        group.activeTasks.push(newTask);
        group.save().then(group => res.status(200).json({ success: "Your new task has been created." })
        ).catch(error => res.status(400).json(error));
    });


// update existing task
router.post("/:id/editTask/:taskId",
    authenticateUser,
    validateReq.addTask,
    groupIsValid,
    taskIsActive,
    userIsGroupMember,
    (req, res) => {
        const { group, task } = req;
        task.text = req.body.text;

        if (req.body.dueDate) {
            task.dueDate = req.body.dueDate;
        } else {
            task.dueDate = undefined;
        }
        group.save().then(() => {
            res.json({ success: "Task modified" });
        }).catch(error => res.status(500).json({ error: "Interal server error 500" }));
    });

// Complete task by task ID
router.post("/:id/completeTask/:taskId",
    authenticateUser,
    groupIsValid,
    taskIsActive,
    userIsGroupMember,
    (req, res) => {
        const { group, task } = req;
        if (task.completed === true)
            return res.status(400).json({ error: "This task is already completed" });

        task.completed = true;
        group.save().then(savedGroup => {
            return res.json(savedGroup);
        }).catch(error => res.status(500).json({ error: "Unable to save task information." }));
    });

// Archive all completed tasks
router.post("/:id/archiveTasks",
    authenticateUser,
    groupIsValid,
    userIsGroupMember,
    (req, res) => {

        const { group } = req;
        let toArchive = group.activeTasks.filter(t => t.completed);
        group.activeTasks = group.activeTasks.filter(t => !t.completed);

        group.archivedTasks.concat(toArchive);

        group.save().then(() => {
            return res.json({ success: "All completed tasks were archived." });
        }).catch(error => res.status(500).json(error));


    });


// Get full info about the group
router.get("/:id",
    authenticateUser,
    groupIsValid,
    userIsGroupMember,
    (req, res) => {
        return res.json(req.group);
    });



module.exports = router;