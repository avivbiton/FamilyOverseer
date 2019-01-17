import { GET_ERRORS, CLEAR_ERRORS } from "./types";

export const createError = (error) => ({
    type: GET_ERRORS,
    error: error
});

export const clearErrors = () => ({
    type: CLEAR_ERRORS
});
