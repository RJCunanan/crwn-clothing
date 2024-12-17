import ProductCard from '../product-card/product-card.component';

import './category-preview.styles.scss';

const CategoryPreview = ({ title, products }) => {
    return (
        <div className='category-preview-container'>
            <h2>
                <span className='title'>{title.toUpperCase()}</span>
            </h2>
            <div className='preview'>
                {
                    // Display only the first four items of each category of products.
                    // Note: the underscore "_" refers to the product that we don't use
                    // in our callback.
                    products
                        .filter((_, index) => index < 4)
                        .map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                }
            </div>
        </div>
    )
}

export default CategoryPreview;