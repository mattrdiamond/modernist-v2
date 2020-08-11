import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import CartIcon from "../cart-icon/cart-icon.component";
import HamburgerButton from "../hamburger-button/hamburger-button.component";
import { Link } from "react-router-dom";
import Icon from "../icon/icon.component";
import { selectMobileNavVisible } from "../../redux/mobile-nav/mobile-nav.selectors";
import { toggleNavVisible } from "../../redux/mobile-nav/mobile-nav.actions";
import "./header.styles.scss";

const HeaderMobile = ({ toggleNavVisible, mobileNavVisible }) => {
  return (
    <div className="nav-wrapper page-width mobile-nav">
      <HamburgerButton
        isOpen={mobileNavVisible}
        toggleVisible={toggleNavVisible}
      />
      <Link className="logo-container" to="/">
        <Icon icon="logo" />
      </Link>
      <div className="nav-link-wrapper">
        <CartIcon />
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  mobileNavVisible: selectMobileNavVisible,
});

const mapDispatchToProps = (dispatch) => ({
  toggleNavVisible: () => dispatch(toggleNavVisible()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMobile);
