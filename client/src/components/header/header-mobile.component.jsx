import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { selectNavVisible } from "../../redux/mobile-nav/mobile-nav.selectors";
import { toggleNav } from "../../redux/mobile-nav/mobile-nav.actions";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import CartIcon from "../cart-icon/cart-icon.component";
import HamburgerButton from "../hamburger-button/hamburger-button.component";
import Icon from "../icon/icon.component";
import MobileNav from "../mobile-nav/mobile-nav.component";
import "./header.styles.scss";

const HeaderMobile = ({
  navVisible,
  toggleNav,
  handleCartClick,
  handleCartKeyPress,
}) => {
  console.log("render header mobile");

  return (
    <div className="mobile-nav-container">
      <div className="nav-wrapper page-width mobile-nav">
        <HamburgerButton isVisible={navVisible} handleToggle={toggleNav} />
        <Link className="logo-container" to="/">
          <Icon icon="modernist" />
        </Link>
        <div className="nav-link-wrapper">
          <CartIcon
            handleClick={handleCartClick}
            handleKeyPress={handleCartKeyPress}
          />
        </div>
      </div>
      <MobileNav />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  navVisible: selectNavVisible,
});

const mapDispatchToProps = (dispatch) => ({
  toggleNav: () => dispatch(toggleNav()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMobile);
