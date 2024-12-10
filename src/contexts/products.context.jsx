import { createContext, useState } from "react";

// Get the product data from the json file. Data is stored in
// an array.
import PRODUCTS from '../shop-data.json';


export const ProductsContext = createContext({
    products: [],
});

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState(PRODUCTS);
    const value = { products };

    return (
        <ProductsContext.Provider value={value}> {children} </ProductsContext.Provider>
    )
}