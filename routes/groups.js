const express = require("express");
const router = express.Router();

const GroupModel = require("../models/GroupModel");
const authUser = require("../Authentication/routeAuth");

const routeValidate = require("./validation/groupsValidator");

router.post("/create", authUser, routeValidate.creation, (req, res) => {
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
router.post("/:id/invite", authUser, routeValidate.invite, (req, res) => {

});

// Leave the current the group
router.post("/:id/leave", authUser, (req, res) => {

});


// Allow user to join if they are invited beforehand
router.post("/:id/join", authUser, (req, res) => {

});

// Decline invites to groups
router.post("/:id/decline", authUser, (req, res) => {

});

// Post new task to the group
router.post("/:id/task", authUser, routeValidate.addTask, (req, res) => {

});

// Complete task by task ID
router.post("/:id/completeTask", authUser, (req, res) => {

});

// Archive Task
router.post("/:id/archiveTask", authUser, (req, res) => {

});

// Get full info about the group
router.get("/:id", authUser, (req, res) => {

});

module.exports = router;