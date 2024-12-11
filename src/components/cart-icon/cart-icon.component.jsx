import { useContext } from 'react';

// Updated way to use import svg files using vite-plugin-svgr.
// See link below for explanation:
// Link: https://stackoverflow.com/questions/70309561/unable-to-import-svg-with-vite-as-reactcomponent
import ShoppingIcon from '../../assets/shopping-bag.svg?react';

import { CartContext } from '../../contexts/cart.context';

import './cart-icon.styles.scss';


const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

    return (
        <div className='cart-icon-container' onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>{cartCount}</span>
        </div>
    )
}

export default CartIcon;