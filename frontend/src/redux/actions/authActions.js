import axios from "axios";
import { createError, clearErrors } from "./errorActions";
import { setupAuthorization, removeAuthorization } from "../../Authorization";
import { SET_USER, LOGOUT_USER, GET_PENDING_INVITES } from "./types";

export const registerUser = (userData, history) => dispatch => {
    axios.post("/api/users/register", userData)
        .then(res => {
            history.push("/login");
            dispatch(clearErrors());
        }).catch(error => dispatch(createError(error.response.data)));

}

export const loginUser = (userData, history) => dispatch => {
    axios.post("/api/users/login", userData)
        .then(res => {
            const token = res.data.token;
            setupAuthorization(token);
            axios.get("/api/users/current")
                .then(currentUser => {
                    dispatch(setUser(currentUser.data));
                    history.push("/");
                    dispatch(clearErrors());
                })
        }).catch(error => dispatch(createError(error.response.data)));
}

export const logoutUser = (history) => dispatch => {
    removeAuthorization();
    dispatch({ type: LOGOUT_USER });
    history.push("/");
}

export const getUserPendingInvites = () => dispatch => {

    axios.get("/api/users/invites")
        .then(response => {
            dispatch({
                type: GET_PENDING_INVITES,
                payload: response.data
            })
        }).catch(error => dispatch(createError(error.response.data)));
}


export const setUser = (userData) => ({
    type: SET_USER,
    payload: userData
});