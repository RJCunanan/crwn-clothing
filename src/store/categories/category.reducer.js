import { CATEGORIES_ACTION_TYPES } from "./category.types";

export const CATEGORIES_INITIAL_STATE = {
    categories: [],
    isLoading: false,
    error: null,
}

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {}) => {
    const { type, payload } = action;

    switch(type) {
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
            // Indicates that we are in a loading state
            return{ ...state, isLoading: true };
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
            // Sets the categories payload and indicates we are no longer
            // in a loading state
            return { ...state, categories: payload, isLoading: false };
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
            // Passes an error payload and indicates we are no longer in
            // a loading state
            return { ...state, error: payload, isLoading: false };
        default:
            return state;
    }
} 