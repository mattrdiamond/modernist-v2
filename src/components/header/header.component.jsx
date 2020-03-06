import React from "react";
import { Link } from "react-router-dom";
// new syntax in React for importing SVG - imports SVG directly as React component
import { ReactComponent as Logo } from "../../assets/crown.svg";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { auth } from "../../firebase/firebase.utils";
import { connect } from "react-redux";

import "./header.styles.scss";

const Header = ({ currentUser, hidden }) => (
  <nav className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/shop">
        CONTACT
      </Link>
      {currentUser ? (
        <div className="option" onClick={() => auth.signOut()}>
          Sign Out
        </div>
      ) : (
        <Link className="option" to="/signin">
          Sign In
        </Link>
      )}
      <CartIcon />
    </div>
    {hidden ? null : <CartDropdown />}
  </nav>
);

// 1. nested destructuring --> {user: {currentUser}} is same as state.user.currentUser
const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
  // 2. then currentUser: state.user.currentUser becomes currentUser
  currentUser,
  hidden
});

export default connect(mapStateToProps)(Header);
