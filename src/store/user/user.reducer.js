import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    isLaoding: false,
    error: null,
}

export const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    
    switch(type) {
        case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
            return { ...state, currentUser: payload };
        case USER_ACTION_TYPES.SIGN_IN_FAILED:
            return { ...state, error: payload };
        default:
            // Return the current state if this reducer does not react to the action
            return state;
    }
}