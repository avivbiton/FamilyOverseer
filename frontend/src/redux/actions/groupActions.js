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