import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react";
// Updated way to use import svg files using vite-plugin-svgr.
// See link below for explanation:
// Link: https://stackoverflow.com/questions/70309561/unable-to-import-svg-with-vite-as-reactcomponent
import CrwnLogo from '../../assets/crown.svg?react';
import './navigation.styles.scss';


/*
Route component that renders a persistent navigation bar containing links
to other pages at the top of our app and any other nested route components
below it.
*/
const Navigation = () => {
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
            </div>
        </div>

        <Outlet />  {/* Renders our other route components: */}
      </Fragment>
    );
};

export default Navigation