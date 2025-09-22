import { useCallback, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import handleKeyPress from "../../utils/handleKeyPress";

import PropTypes from "prop-types";
import {
  currentUserType,
  sectionsType,
} from "../../sharedPropTypes/sharedPropTypes";

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
import useRedirectToSignIn from "../../hooks/use-redirect-to-signin";

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
  const mobileNavRef = useRef(null);
  const searchDrawerRef = useRef(null);

  const redirectToSignIn = useRedirectToSignIn();

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
  };

  const handleShopMouseLeave = () => {
    if (!shopDropdownHidden) {
      toggleShopDropdown();
    }
  };

  const handleShopTouchStart = useCallback(
    (e) => {
      e.preventDefault();
      if (shopDropdownHidden) {
        toggleShopDropdown();
      }
    },
    [shopDropdownHidden, toggleShopDropdown]
  );

  useEffect(() => {
    const shopLink = shopLinkRef.current;

    if (shopLink) {
      shopLink.addEventListener("touchstart", handleShopTouchStart, {
        passive: false,
      });
    }

    return () => {
      if (shopLink) {
        shopLink.removeEventListener("touchstart", handleShopTouchStart);
      }
    };
  }, [handleShopTouchStart]);

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
                className='nav-link sign-in-out'
                tabIndex='0'
                onClick={signOutStart}
                onKeyDown={(e) => handleKeyPress(e, signOutStart)}
              >
                Sign Out
              </div>
            ) : (
              <button
                type='button'
                className='nav-link sign-in-out'
                onClick={redirectToSignIn}
              >
                Sign In
              </button>
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
              <Icon
                icon='favorites-desktop'
                title='favorites'
                width='20px'
                height='20px'
              />
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
        nodeRef={mobileNavRef}
        classNames='mobile-nav'
        timeout={200}
        unmountOnExit
      >
        <MobileNav ref={mobileNavRef} />
      </CSSTransition>
      <CSSTransition
        in={!searchDrawerHidden}
        nodeRef={searchDrawerRef}
        classNames='search-drawer'
        timeout={500}
        unmountOnExit
      >
        <SearchDrawer ref={searchDrawerRef} />
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

Header.propTypes = {
  currentUser: currentUserType,
  signOutStart: PropTypes.func.isRequired,
  mobileNavVisible: PropTypes.bool.isRequired,
  toggleMobileNav: PropTypes.func.isRequired,
  toggleCartHidden: PropTypes.func.isRequired,
  shopDropdownHidden: PropTypes.bool.isRequired,
  toggleShopDropdown: PropTypes.func.isRequired,
  searchDrawerHidden: PropTypes.bool.isRequired,
  toggleInputHidden: PropTypes.func.isRequired,
  sections: sectionsType.isRequired,
};
