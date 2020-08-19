import React, { useCallback } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectNavVisible } from "../../redux/mobile-nav/mobile-nav.selectors";
import { selectInputHidden } from "../../redux/search/search.selectors";
import { signOutStart } from "../../redux/user/user.actions";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { toggleNav } from "../../redux/mobile-nav/mobile-nav.actions";
import { closeSearchDrawer } from "../../redux/search/search.actions";

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
  const handleCartClick = useCallback(() => {
    if (!navVisible) {
      return toggleCartHidden();
    }
    // close nav if open
    toggleNav();
    toggleCartHidden();
  }, [navVisible, toggleNav, toggleCartHidden]);

  const handleCartKeyPress = useCallback(
    (e) => {
      if (e.key !== "Enter") return;
      toggleCartHidden();
    },
    [toggleCartHidden]
  );

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
  searchDrawerHidden: selectInputHidden,
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
  toggleCartHidden: () => dispatch(toggleCartHidden()),
  toggleNav: () => dispatch(toggleNav()),
  closeSearchDrawer: () => dispatch(closeSearchDrawer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
