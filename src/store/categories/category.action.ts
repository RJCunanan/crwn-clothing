import { CATEGORIES_ACTION_TYPES, Category } from "./category.types";

import { createAction, Action, ActionWithPayload } from "../../utils/reducer/reducer.utils";

export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;

export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>;

export type FetchCategoriesFailed = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>;

export type CategoryAction = FetchCategoriesStart | FetchCategoriesSuccess | FetchCategoriesFailed

// Action that tells our redux store that we are starting to fetch categories
export const fetchCategoriesStart = (): FetchCategoriesStart => 
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

// Action that indicates successful fetching, takes in our categories array, 
// and passes it as the payload
export const fetchCategoriesSuccess = (categoriesArray: Category[]): FetchCategoriesSuccess => 
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray);

// Action that indicates failed fetching, takes in an error, and passes it 
// as the payload
export const FetchCategoriesFailed = (error: Error): FetchCategoriesFailed => 
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);