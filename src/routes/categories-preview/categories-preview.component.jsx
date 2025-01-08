import { Fragment } from "react";
import { useSelector } from "react-redux";

import { selectCategoriesMap, selectCategoriesIsLoading } from "../../store/categories/category.selector";

import CategoryPreview from "../../components/category-preview/category-preview.component";
import Spinner from "../../components/spinner/spinner.component";


const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);

    return (
        <Fragment>

            {/* If the page is in a loading state, render the spinner, otherwise 
            render the categories preview */}
            {isLoading ? (
                <Spinner />
            ) : (
                // Get an array of the key values and map through them
                (Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title];
                    return (
                        <CategoryPreview key={title} title={title} products={products} />
                    );
                }))
            )}
        </Fragment>
    );
};

export default CategoriesPreview;