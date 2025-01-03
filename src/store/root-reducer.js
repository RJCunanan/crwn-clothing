import { combineReducers } from "redux";

import { userReducer } from "./user/user.reducer";
import { categoriesReducer } from "./categories/category.reducer";

// Takes all of the existing reducers and combine them into one root reducer.
export const rootReducer = combineReducers({
    // Keys are the names of the reducer slice and the values are the actual 
    // reducer functions themselves 
    user: userReducer,
    categories: categoriesReducer,
});