import { combineReducers } from "redux";

import { userReducer } from "./user/user.reducer";

// Keys are the names of the reducer slice and the values are the actual 
// reducer functions themselves
export const rootReducer = combineReducers({
    user: userReducer
});