import { createSelector } from "reselect";

import { CategoriesState } from "./category.reducer";
import { CategoryMap } from "./category.types";

const selectCategoryReducer = (state): CategoriesState => state.categories;

// Creates a momoized selector for categories:
export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
);

// As long as the categories array from selectCategories does not change,
// do not rerun categories.reduce(). Just return the previously calculated
// value.
export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories): CategoryMap => 
        categories.reduce((acc, category) => {
            const { title, items } = category;
            acc[title.toLowerCase()] = items;
            return acc;
        }, {} as CategoryMap)
);

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
);