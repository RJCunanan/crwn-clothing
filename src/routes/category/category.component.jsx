import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';

import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/category.selector';

import { CategoryContainer, Title } from './category.styles';

const Category = () => {
    // Get the category parameter value from the path in our shop component
    const { category } = useParams();

    // Get our categories map from the selector
    const categoriesMap = useSelector(selectCategoriesMap);

    const isLoading = useSelector(selectCategoriesIsLoading);

    const [products, setProducts] = useState(categoriesMap[category]);

    // Makes it so component only re-renders whenever either the category or categoriesMap changes
    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap])

    return (
        <Fragment>
            <Title>{category.toUpperCase()}</Title>
            {/* If the page is in a loading state, render the spinner, otherwise render
            the category container and its products */}
            {isLoading ? (
                <Spinner />
            ) : (
                <CategoryContainer>
                    {   // Safeguard: Render the products map only if products is NOT undefined.
                        // Protects from async fetch code from the categories context.
                        products && products.map((product) => <ProductCard key={product.id} product={product} />)
                    }
                </CategoryContainer>
            )}
        </Fragment>
    )
}

export default Category;