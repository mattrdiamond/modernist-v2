import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectNavVisible } from "../../redux/mobile-nav/mobile-nav.selectors";
import { signOutStart } from "../../redux/user/user.actions";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { toggleNav } from "../../redux/mobile-nav/mobile-nav.actions";

import HeaderMobile from "./header-mobile.component";
import HeaderDesktop from "./header-desktop.component";
import "./header.styles.scss";

const Header = ({
  currentUser,
  signOutStart,
  navVisible,
  toggleCartHidden,
  toggleNav,
}) => {
  const handleCartClick = () => {
    if (!navVisible) {
      return toggleCartHidden();
    }
    // close nav if open
    toggleNav();
    toggleCartHidden();
  };

  const handleCartKeyPress = (e) => {
    if (e.key !== "Enter") return;
    toggleCartHidden();
  };

  console.log("render header");

  return (
    <nav className="header">
      <HeaderDesktop
        signOutStart={signOutStart}
        currentUser={currentUser}
        handleCartClick={handleCartClick}
        handleCartKeyPress={handleCartKeyPress}
      />
      <HeaderMobile
        signOutStart={signOutStart}
        handleCartClick={handleCartClick}
        handleCartKeyPress={handleCartKeyPress}
      />
    </nav>
  );
};

// createStructuredSelector passes state into multiple selectors
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  navVisible: selectNavVisible,
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
  toggleCartHidden: () => dispatch(toggleCartHidden()),
  toggleNav: () => dispatch(toggleNav()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
