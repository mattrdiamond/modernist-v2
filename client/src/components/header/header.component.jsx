import React, { useCallback, useRef } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import handleKeyPress from "../../utils/handleKeyPress";

import { selectDropdownHidden } from "../../redux/shop/shop.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectNavVisible } from "../../redux/mobile-nav/mobile-nav.selectors";
import { selectInputHidden } from "../../redux/search/search.selectors";
import { selectDirectorySections } from "../../redux/directory/directory.selectors";

import { signOutStart } from "../../redux/user/user.actions";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { toggleNav } from "../../redux/mobile-nav/mobile-nav.actions";
import { toggleShopDropdown } from "../../redux/shop/shop.actions";
import { toggleInputHidden } from "../../redux/search/search.actions";

import ArrowButton from "../arrow-button/arrow-button.component";
import ShopDropdown from "../shop-dropdown/shop-dropdown.component";
import Icon from "../icon/icon.component";
import SearchIcon from "../search-icon/search-icon.component";
import CartIcon from "../cart-icon/cart-icon.component";
import HamburgerButton from "../hamburger-button/hamburger-button.component";
import SearchDrawer from "../search-drawer/search-drawer.component";
import MobileNav from "../mobile-nav/mobile-nav.component";

import "./header.styles.scss";

const Header = ({
  currentUser,
  signOutStart,
  mobileNavVisible,
  toggleMobileNav,
  toggleCartHidden,
  shopDropdownHidden,
  toggleShopDropdown,
  searchDrawerHidden,
  toggleInputHidden,
  sections,
}) => {
  const shopLinkRef = useRef(null);

  const handleCartClick = useCallback(() => {
    if (!mobileNavVisible) {
      return toggleCartHidden();
    }
    // close mobileNav if open when cart clicked
    toggleMobileNav();
    toggleCartHidden();
  }, [mobileNavVisible, toggleMobileNav, toggleCartHidden]);

  const handleCartKeyPress = useCallback(
    (e) => {
      handleKeyPress(e, handleCartClick);
    },
    [handleCartClick]
  );

  const handleShopClick = () => {
    shopLinkRef.current.blur();
    toggleShopDropdown();
  };

  const handleShopMouseLeave = () => {
    if (!shopDropdownHidden) {
      toggleShopDropdown();
    }
  };

  return (
    <nav className='header'>
      <div className='nav-wrapper page-width'>
        <div className='mobile-nav-btn mobile-only'>
          <HamburgerButton
            isOpen={mobileNavVisible}
            handleToggle={toggleMobileNav}
          />
        </div>
        <ul className='nav-links left desktop-only'>
          <li className='nav-link-wrapper'>
            {currentUser ? (
              <div
                className='nav-link'
                tabIndex='0'
                onClick={signOutStart}
                onKeyDown={(e) => handleKeyPress(e, signOutStart)}
              >
                Sign Out
              </div>
            ) : (
              <Link className='nav-link' to='/signin'>
                Sign In
              </Link>
            )}
          </li>
          <li className='nav-link-wrapper'>
            <Link
              to='/shop'
              className={"nav-link" + (!shopDropdownHidden ? " is-open" : "")}
              onClick={handleShopClick}
              onKeyDown={(e) => handleKeyPress(e, toggleShopDropdown)}
              onMouseEnter={toggleShopDropdown}
              onMouseLeave={handleShopMouseLeave}
              tabIndex='0'
              role='button'
              aria-haspopup='true'
              aria-expanded={shopDropdownHidden ? false : true}
              ref={shopLinkRef}
            >
              Shop
              <ArrowButton isClosed={shopDropdownHidden} />
            </Link>
          </li>
        </ul>
        <Link className='logo-container' to='/'>
          <Icon icon='modernist' />
        </Link>
        <div className='nav-links right'>
          <div className='nav-link-wrapper desktop-only'>
            <Link className='nav-icon' to='/favorites'>
              <Icon icon='favorites-desktop' width='20px' height='20px' />
            </Link>
          </div>
          <div className='nav-link-wrapper desktop-only'>
            <SearchIcon toggleInputHidden={toggleInputHidden} />
          </div>
          <div className='nav-link-wrapper'>
            <CartIcon
              handleClick={handleCartClick}
              handleKeyPress={handleCartKeyPress}
            />
          </div>
        </div>
      </div>
      {/*
        CSSTransition - applies CSS transition before adding/removing element from DOM
          • in - condition must be met to display child component (mobileNav)
          • classNames - applied when element added/removed from DOM
          • timeout - transition time
          • unmountOnExit - unmount the child component after it finishes exiting
      */}
      <CSSTransition
        in={mobileNavVisible}
        classNames='mobile-nav'
        timeout={200}
        unmountOnExit
      >
        <MobileNav />
      </CSSTransition>
      <CSSTransition
        in={!searchDrawerHidden}
        classNames='search-drawer'
        timeout={500}
        unmountOnExit
      >
        <SearchDrawer />
      </CSSTransition>
      {!shopDropdownHidden && (
        <ShopDropdown
          toggleShopDropdown={toggleShopDropdown}
          sections={sections}
        />
      )}
    </nav>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  mobileNavVisible: selectNavVisible,
  searchDrawerHidden: selectInputHidden,
  shopDropdownHidden: selectDropdownHidden,
  sections: selectDirectorySections,
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
  toggleCartHidden: () => dispatch(toggleCartHidden()),
  toggleMobileNav: () => dispatch(toggleNav()),
  toggleShopDropdown: () => dispatch(toggleShopDropdown()),
  toggleInputHidden: () => dispatch(toggleInputHidden()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
