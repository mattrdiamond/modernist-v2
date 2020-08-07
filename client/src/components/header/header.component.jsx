import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { selectInputHidden } from "../../redux/search/search.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectDropdownHidden } from "../../redux/shop/shop.selectors";
// new syntax in React for importing SVG - imports SVG directly as React component
import CartIcon from "../cart-icon/cart-icon.component";
import SearchInput from "../search-input/search-input.component";
import SearchIcon from "../search-icon/search-icon.component";
import Icon from "../icon/icon.component";
import ShopDropdown from "../shop-dropdown/shop-dropdown.component";
import { connect } from "react-redux";
import { signOutStart } from "../../redux/user/user.actions";
import { toggleDropdownHidden } from "../../redux/shop/shop.actions";
import "./header.styles.scss";
import { toggleInputHidden } from "../../redux/search/search.actions";

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

  const focusOnInput = () => {
    inputRef.current.focus();
  };

  return (
    <nav className="header">
      <div className="nav-wrapper page-width">
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
            <button
              className={"nav-link" + (!shopDropdownHidden ? " is-open" : "")}
              onClick={toggleShopDropdown}
            >
              Shop
            </button>

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
