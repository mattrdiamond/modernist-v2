import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import {
  selectMobileNavVisible,
  selectIsNavAnimating,
} from "../../redux/mobile-nav/mobile-nav.selectors";
import {
  openNav,
  closeNavStart,
} from "../../redux/mobile-nav/mobile-nav.actions";
import CartIcon from "../cart-icon/cart-icon.component";
import HamburgerButton from "../hamburger-button/hamburger-button.component";
import Icon from "../icon/icon.component";
import MobileNav from "../mobile-nav/mobile-nav.component";
import useWindowSize from "../../utils/use-window-size";

import "./header.styles.scss";

const HeaderMobile = ({ isVisible, openNav, closeNavStart, isAnimating }) => {
  console.log("render header mobile");

  const handleResize = () => {
    console.log("resize", window.innerWidth);
    if (isVisible && window.innerWidth > 800) {
      console.log("close dat thang");
      closeNavStart();
    }
  };
  useWindowSize(handleResize);

  return (
    <div className="mobile-nav-container">
      <div className="nav-wrapper page-width mobile-nav">
        <HamburgerButton
          isVisible={isVisible}
          openNav={openNav}
          closeNavStart={closeNavStart}
          isAnimating={isAnimating}
        />
        <Link className="logo-container" to="/">
          <Icon icon="logo" />
        </Link>
        <div className="nav-link-wrapper">
          <CartIcon />
        </div>
      </div>
      {isVisible && (
        <MobileNav
          isAnimating={isAnimating}
          isVisible={isVisible}
          closeNavStart={closeNavStart}
        />
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isVisible: selectMobileNavVisible,
  isAnimating: selectIsNavAnimating,
});

const mapDispatchToProps = (dispatch) => ({
  openNav: () => dispatch(openNav()),
  closeNavStart: () => dispatch(closeNavStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMobile);
