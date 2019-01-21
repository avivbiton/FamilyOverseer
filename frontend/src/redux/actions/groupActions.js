import axios from "axios";
import { GET_USER_GROUPS, GET_CURRENT_GROUP } from "./types";
import { createError, clearErrors } from "./errorActions";

export const getUserGroups = () => dispatch => {
    axios.get("/api/users/groups")
        .then(response => {
            const groups = response.data.groups;
            dispatch({
                type: GET_USER_GROUPS,
                payload: groups
            })
        })
}

export const getGroupInformation = (groupId) => dispatch => {
    axios.get(`/api/groups/${groupId}`)
        .then(response => {

            dispatch({
                type: GET_CURRENT_GROUP,
                payload: response.data
            })
            dispatch(clearErrors());
        }).catch(error => dispatch(createError(error.response.data)));
}

export const createGroupTask = (groupId, text, dueDate, callback) => dispatch => {

    const data = {
        text: text
    }
    if (typeof dueDate !== "undefined")
        data.dueDate = dueDate;
    axios.post(`/api/groups/${groupId}/task`, data)
        .then(() => {
            if (callback)
                callback();
            dispatch(getGroupInformation(groupId));
        })
        .catch(error => dispatch(createError(error.response.data)));
}

export const completeGroupTask = (groupId, taskId) => dispatch => {

    axios.post(`/api/groups/${groupId}/completeTask/${taskId}`)
        .then(result => {
            dispatch(getGroupInformation(groupId));
        }).catch(error => dispatch(createError(error.response.data)));

}

export const editGroupTask = (groupId, taskId, text, dueDate, callback) => dispatch => {
    const data = {
        text: text
    }
    if (typeof dueDate !== "undefined")
        data.dueDate = dueDate;

    axios.post(`/api/groups/${groupId}/editTask/${taskId}`, data)
        .then(response => {
            if (callback)
                callback();
            dispatch(getGroupInformation(groupId));
        }).catch(error => dispatch(createError(error.response.data)));
}

export const createGroup = (name, callback) => dispatch => {

    const data = {
        name: name
    }

    axios.post("/api/groups/create", data)
        .then(result => {
            if (callback) callback();
        })
        .catch(error => dispatch(createError(error.response.data)));
}

export const leaveGroup = (groupId, callback) => dispatch => {

    axios.post(`/api/groups/${groupId}/leave`)
        .then(result => {
            if (callback) callback();
        })
        .catch(error => dispatch(createError(error.response.data)));
}

export const archiveCompletedTasks = (groupId) => dispatch => {
    axios.post(`/api/groups/${groupId}/archiveTasks`)
        .then(() => {
            dispatch(getGroupInformation(groupId));
        }).catch(error => dispatch(createError(error.response.data)));
}

export const inviteUserToGroup = (groupId, userEmail, callback) => dispatch => {

    const data = {
        userEmail: userEmail
    }
    axios.post(`/api/groups/${groupId}/invite`, data)
        .then(result => {
            if (callback) callback(result.data.userName);
            dispatch(clearErrors());
        })
        .catch(error => dispatch(createError(error.response.data)));
}

export const acceptGroupInvite = (groupId) => dispatch => {
    axios.post(`/api/groups/${groupId}/join`)
        .then(result => {

        })
        .catch(error => dispatch(createError(error.response.data)));
}

export const declineGroupInvite = (groupId) => dispatch => {
    axios.post(`/api/groups/${groupId}/decline`)
        .then(result => {

        })
        .catch(error => dispatch(createError(error.response.data)));
}


