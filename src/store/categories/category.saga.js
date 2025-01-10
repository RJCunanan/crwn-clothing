import { takeLatest, all, call, put } from "redux-saga/effects";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import { fetchCategoriesSuccess, fetchCategoriesFailed } from "./category.action";

import { CATEGORIES_ACTION_TYPES } from "./category.types";



// Saga:
export function* fetchCategoriesAsync() {
    try {
        // Get the categories array from firebase
        const categoriesArray = yield call(getCategoriesAndDocuments, 'categories');
        // Generator version of dispatch() that produces an action:
        yield put(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
        yield put(fetchCategoriesFailed(error));
    }
}

// Whenever we take the latest FETCH_CATEGORIES_START action, initialize the
// fetchCategoriesAsync saga
export function* onFetchCategories() {
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}

// Accumulator that holds all of the sagas that are related to the category
export function* categoriesSaga() {
    yield all([call(onFetchCategories)])
}