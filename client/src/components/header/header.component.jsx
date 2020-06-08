import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectInputHidden } from "../../redux/search/search.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
// new syntax in React for importing SVG - imports SVG directly as React component
import { ReactComponent as Logo } from "../../assets/crown.svg";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import SearchInput from "../search-input/search-input.component";
import SearchIcon from "../search-icon/search-icon.component";
import Icon from "../icon/icon.component";
import { connect } from "react-redux";
import { signOutStart } from "../../redux/user/user.actions";
import "./header.styles.scss";

const Header = ({ currentUser, cartHidden, inputHidden, signOutStart }) => {
  const inputRef = useRef(null);

  const focusOnInput = () => {
    inputRef.current.focus();
  };

  return (
    <nav className="header">
      <div className="nav-wrapper page-width">
        <div className="nav-links">
          {currentUser ? (
            <div className="nav-link" onClick={signOutStart}>
              Sign Out
            </div>
          ) : (
            <Link className="nav-link" to="/signin">
              Sign In
            </Link>
          )}
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
        </div>
        <Link className="logo-container" to="/">
          <Logo className="logo" />
        </Link>
        <div className="nav-links right">
          <Link className="nav-icon" to="/favorites">
            <Icon icon="heart-outline" width="20px" height="20px" />
          </Link>
          <SearchIcon focusOnInput={focusOnInput} inputHidden={inputHidden} />
          <CartIcon />
        </div>
      </div>
      <SearchInput inputHidden={inputHidden} inputRef={inputRef} />
      {cartHidden ? null : <CartDropdown />}
    </nav>
  );
};

// createStructuredSelector passes state into multiple selectors
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  cartHidden: selectCartHidden,
  inputHidden: selectInputHidden,
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
