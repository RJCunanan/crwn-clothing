import { Fragment } from "react";
import { Outlet} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { selectCurrentUser } from "../../store/user/user.selector";

// Updated way to use import svg files using vite-plugin-svgr.
// See link below for explanation:
// Link: https://stackoverflow.com/questions/70309561/unable-to-import-svg-with-vite-as-reactcomponent
import CrwnLogo from '../../assets/crown.svg?react';

import { signOutStart } from "../../store/user/user.action";

import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles';


/*
Route component that renders a persistent navigation bar containing links
to other pages at the top of our app and any other nested route components
below it.
*/
const Navigation = () => {
    const dispatch = useDispatch();

    // Gets values from the state using a selector function and the
    // useSelector hook.
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);

    const signOutUser = () => dispatch(signOutStart());

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