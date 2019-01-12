import axios from "axios";
import { createError } from "./errorActions";
import { setupAuthorization, removeAuthorization } from "../../Authorization";
import { SET_USER, LOGOUT_USER } from "./types";

export const registerUser = (userData, history) => dispatch => {
    axios.post("/api/users/register", userData)
        .then(res => {
            history.push("/login");
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
                })
        }).catch(error => dispatch(createError(error.response.data)));
}

export const logoutUser = (history) => dispatch => {
    removeAuthorization();
    dispatch({ type: LOGOUT_USER });
    history.push("/");
}


export const setUser = (userData) => ({
    type: SET_USER,
    payload: userData
});