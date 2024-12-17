import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';

import { CategoriesContext } from '../../contexts/categories.context';

import './category.styles.scss';

const Category = () => {
    // Get the category parameter value from the path in our shop component
    const { category } = useParams();

    // Get our categories map from the context
    const { categoriesMap } = useContext(CategoriesContext);

    const [products, setProducts] = useState(categoriesMap[category]);

    // Makes it so component only re-renders whenever either the category or categoriesMap changes
    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap])

    return (
        <div className='category-container'>
            {   // Safeguard: Render the products map only if products is NOT undefined.
                // Protects from async fetch code from the categories context.
                products && products.map((product) => <ProductCard key={product.id} product={product} />)
            }
        </div>
    )
}

export default Category;