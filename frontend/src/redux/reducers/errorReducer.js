import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

const initState = {
};

export default function (state = initState, action) {
    switch (action.type) {
        case GET_ERRORS:
            return action.error
        case CLEAR_ERRORS:
            return {};
        default:
            return state;
    }
}