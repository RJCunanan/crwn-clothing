import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

// Updated way to use import svg files using vite-plugin-svgr.
// See link below for explanation:
// Link: https://stackoverflow.com/questions/70309561/unable-to-import-svg-with-vite-as-reactcomponent
import CrwnLogo from '../../assets/crown.svg?react';
import { UserContext } from "../../contexts/user.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import './navigation.styles.scss';


/*
Route component that renders a persistent navigation bar containing links
to other pages at the top of our app and any other nested route components
below it.
*/
const Navigation = () => {
    // Get the user value from the context
    const { currentUser, setCurrentUser } = useContext(UserContext);
    
    const signOutHandler = async () => {
        await signOutUser();

        // Reset the context to reflect the user signing out
        setCurrentUser(null);
    }

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
                        <span className='nav-link' onClick={signOutHandler}>SIGN OUT</span>
                    ) : (
                        <Link className='nav-link' to='/auth'>
                            SIGN IN
                        </Link>
                    )  
                }
            </div>
        </div>

        <Outlet />  {/* Renders our other route components: */}
      </Fragment>
    );
};

export default Navigation