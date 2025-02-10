import { CATEGORIES_ACTION_TYPES, Category } from "./category.types";

import { CategoryAction } from "./category.action";

export type CategoriesState = {
    readonly categories: Category[];
    readonly isLoading: boolean;
    readonly error: Error | null;
}

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
    categories: [],
    isLoading: false,
    error: null,
}

export const categoriesReducer = (
    state = CATEGORIES_INITIAL_STATE, 
    action = {} as CategoryAction
): CategoriesState => {
    switch(action.type) {
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
            // Indicates that we are in a loading state
            return{ ...state, isLoading: true };
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
            // Sets the categories payload and indicates we are no longer
            // in a loading state
            return { ...state, categories: action.payload, isLoading: false };
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
            // Passes an error payload and indicates we are no longer in
            // a loading state
            return { ...state, error: action.payload, isLoading: false };
        default:
            return state;
    }
} 