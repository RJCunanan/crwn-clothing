import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

// Updated way to use import svg files using vite-plugin-svgr.
// See link below for explanation:
// Link: https://stackoverflow.com/questions/70309561/unable-to-import-svg-with-vite-as-reactcomponent
import CrwnLogo from '../../assets/crown.svg?react';

import { signOutUser } from "../../utils/firebase/firebase.utils";

import './navigation.styles.scss';


/*
Route component that renders a persistent navigation bar containing links
to other pages at the top of our app and any other nested route components
below it.
*/
const Navigation = () => {
    // Get the user and cart from their context
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    return (
      <Fragment>
        <div className='navigation'>
            <Link className='logo-container' to='/'>
                <CrwnLogo className='logo' />
            </Link>
            <div className='nav-links-container'>
                <Link className='nav-link' to='/shop'>
                    SHOP
                </Link>
                {
                    currentUser ? (
                        <span className='nav-link' onClick={signOutUser}>SIGN OUT</span>
                    ) : (
                        <Link className='nav-link' to='/auth'>
                            SIGN IN
                        </Link>
                    )  
                }
                <CartIcon />
            </div>
            {isCartOpen && <CartDropdown />}   {/* If isCartOpen is true, render the CartDropdown component */}
        </div>

        <Outlet />  {/* Renders our other route components: */}
      </Fragment>
    );
};

export default Navigation