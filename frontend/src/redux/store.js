import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

// import reducers
import authReducer from "./reducers/authReducer";
import errorReducer from "./reducers/errorReducer";
import groupsReducer from "./reducers/groupsReducer";

const initialState = {};

const rootReducer = combineReducers({
    auth: authReducer,
    errors: errorReducer,
    groups: groupsReducer
});

const middleware = [thunk];

// composeEnhancer is created to assure the dev tools only available while the app is running in dev mode &&
// The user has the extension installed otherwise the site will not work.
const composeEnhancer =
    process.env.NODE_ENV !== "production" &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            name: "App",
            actionBlacklist: ["REDUX_STORAGE_SAVE"]
        })
        : compose;

const store = createStore(
    rootReducer,
    initialState,
    composeEnhancer(applyMiddleware(...middleware))
);

export default store;
