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

import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles';


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
        <NavigationContainer>
            <LogoContainer to='/'>
                <CrwnLogo className='logo' />
            </LogoContainer>
            <NavLinks>
                <NavLink to='/shop'>
                    SHOP
                </NavLink>
                {
                    currentUser ? (
                        <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
                    ) : (
                        <NavLink to='/auth'>
                            SIGN IN
                        </NavLink>
                    )  
                }
                <CartIcon />
            </NavLinks>
            {/* If isCartOpen is true, render the CartDropdown component */}
            {isCartOpen && <CartDropdown />}   
        </NavigationContainer>

        <Outlet />  {/* Renders our other route components: */}
      </Fragment>
    );
};

export default Navigation