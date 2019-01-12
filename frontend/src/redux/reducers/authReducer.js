import { SET_USER, LOGOUT_USER } from "../actions/types";

const initState = {
    user: {},
    isAuthenticated: false
};

export default function (state = initState, action) {

    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true
            }
        case LOGOUT_USER:
            return {
                ...state,
                user: {},
                isAuthenticated: false
            }
        default:
            return state;
    }
}