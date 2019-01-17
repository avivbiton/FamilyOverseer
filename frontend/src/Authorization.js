import axios from "axios";
import decode from 'jwt-decode';


export const authorizeTokenFromStorage = () => {
    if (localStorage.getItem("JWT_TOKEN_KEY")) {
        const token = localStorage.getItem("JWT_TOKEN_KEY");
        if (hasTokenExpired(token)) {
            localStorage.removeItem("JWT_TOKEN_KEY");
        } else {
            setupAuthorization(token);
        }
        return true;
    }
    return false;
}

export const hasTokenExpired = (key) => {

    try {
        const decodedKey = decode(key);

        if (decodedKey.exp < Date.now() / 1000) {
            return true;
        }
        return false;
    } catch{

        return true;
    }
}

export const setupAuthorization = (key) => {
    setDefaultAuth(key);
    storeKeyInStorage(key);
}

export const removeAuthorization = () => {
    try {
        setDefaultAuth("");
        localStorage.removeItem("JWT_TOKEN_KEY");
    } catch{

    }
}

const setDefaultAuth = (key) => {
    if (!key) {
        key = "";
    }
    axios.defaults.headers.common['Authorization'] = key;
}

const storeKeyInStorage = (key) => {
    localStorage.setItem("JWT_TOKEN_KEY", key);
}


// Refresh token interceptor
axios.interceptors.request.use(config => {

    if (config.headers.Authorization) {
        const token = config.headers.Authorization;
        if (hasTokenExpired(token)) {
            // refresh token
        }

    }
    return config;
});