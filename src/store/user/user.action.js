import { USER_ACTION_TYPES } from "./user.types";
import { createAction } from "../../utils/reducer/reducer.utils";

// Passes the action object to userReducer:
export const setCurrentUser = (user) => 
    createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);