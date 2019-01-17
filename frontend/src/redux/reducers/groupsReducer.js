import { GET_USER_GROUPS, GET_CURRENT_GROUP } from "../actions/types";

const initState = {
    allGroups: [],
    currentGroup: undefined
}

export default function (state = initState, action) {
    switch (action.type) {
        case GET_USER_GROUPS:
            return {
                ...state,
                allGroups: action.payload
            }
        case GET_CURRENT_GROUP:
            return {
                ...state,
                currentGroup: action.payload
            }
        default:
            return state;
    }
}