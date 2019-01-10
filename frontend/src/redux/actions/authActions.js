import axios from "axios";
import { createError } from "./errorActions";

export const registerUser = (userData, history) => dispatch => {
    axios.post("/api/users/register", userData)
        .then(user => {
            history.push("/login");
        }).catch(error => dispatch(createError(error.response.data)));

}