import { SET_USER, LOGOUT_USER, GET_PENDING_INVITES } from "../actions/types";

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
        case GET_PENDING_INVITES:
            return {
                ...state,
                pendingInvites: action.payload
            }
        default:
            return state;
    }
}