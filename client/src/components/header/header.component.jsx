import React, { useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { selectInputHidden } from "../../redux/search/search.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectDropdownHidden } from "../../redux/shop/shop.selectors";
import { selectMobileNavVisible } from "../../redux/mobile-nav/mobile-nav.selectors";
import CartIcon from "../cart-icon/cart-icon.component";
import SearchInput from "../search-input/search-input.component";
import SearchIcon from "../search-icon/search-icon.component";
import Icon from "../icon/icon.component";
import ShopDropdown from "../shop-dropdown/shop-dropdown.component";
import ArrowButton from "../arrow-button/arrow-button.component";
import HamburgerButton from "../hamburger-button/hamburger-button.component";
import { connect } from "react-redux";
import { signOutStart } from "../../redux/user/user.actions";
import { toggleDropdownHidden } from "../../redux/shop/shop.actions";
import { toggleNavVisible } from "../../redux/mobile-nav/mobile-nav.actions";
import HeaderMobile from "./header-mobile.component";
import "./header.styles.scss";

const Header = ({
  currentUser,
  inputHidden,
  cartHidden,
  signOutStart,
  toggleShopDropdown,
  shopDropdownHidden,
}) => {
  const inputRef = useRef(null);
  // const shopDropdownRef = useRef(null);

  const focusOnInput = useCallback(() => {
    inputRef.current.focus();
  }, [inputRef]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") toggleShopDropdown();
  };

  return (
    <nav className="header">
      <div className="nav-wrapper page-width desktop-nav">
        <ul className="nav-links left">
          <li className="nav-link-wrapper">
            {currentUser ? (
              <div className="nav-link" onClick={signOutStart}>
                Sign Out
              </div>
            ) : (
              <Link className="nav-link" to="/signin">
                Sign In
              </Link>
            )}
          </li>
          <li className="nav-link-wrapper">
            <div
              className={
                "nav-link ignore-co-shop" +
                (!shopDropdownHidden ? " is-open" : "")
              }
              onClick={toggleShopDropdown}
              onKeyPress={handleKeyPress}
              tabIndex="0"
              role="button"
              aria-haspopup="true"
              aria-expanded={shopDropdownHidden ? false : true}
            >
              Shop
              <ArrowButton
                isClosed={shopDropdownHidden}
                styleName="ignore-co-shop"
              />
            </div>
            {!shopDropdownHidden ? (
              <ShopDropdown
                toggleShopDropdown={toggleShopDropdown}
                shopDropdownHidden={shopDropdownHidden}
              />
            ) : (
              ""
            )}
          </li>
        </ul>
        <Link className="logo-container" to="/">
          <Icon icon="logo" />
        </Link>
        <div className="nav-links right">
          <div className="nav-link-wrapper">
            <Link className="nav-icon" to="/favorites">
              <Icon icon="heart-outline" width="20px" height="20px" />
            </Link>
          </div>
          <div className="nav-link-wrapper">
            <SearchIcon focusOnInput={focusOnInput} inputHidden={inputHidden} />
          </div>
          <div className="nav-link-wrapper">
            <CartIcon />
          </div>
        </div>
      </div>
      <HeaderMobile />
      <SearchInput inputHidden={inputHidden} inputRef={inputRef} />
    </nav>
  );
};

// createStructuredSelector passes state into multiple selectors
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  inputHidden: selectInputHidden,
  cartHidden: selectCartHidden,
  shopDropdownHidden: selectDropdownHidden,
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
  toggleShopDropdown: () => dispatch(toggleDropdownHidden()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
