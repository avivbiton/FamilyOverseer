import { SET_USER } from "../actions/types";

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
        default:
            return state;
    }
}