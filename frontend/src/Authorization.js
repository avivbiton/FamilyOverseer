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
    }
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

const setDefaultAuth = (key) => {
    if (!key) {
        key = "";
    }
    axios.defaults.headers.common['Authorization'] = key;
}

const storeKeyInStorage = (key) => {
    localStorage.setItem("JWT_TOKEN_KEY", key);
}