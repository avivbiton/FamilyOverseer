import { GET_ERRORS } from "./types";

export const createError = (error) => ({
    type: GET_ERRORS,
    error: error
});

