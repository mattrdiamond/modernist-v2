import React from "react";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { connect } from "react-redux";
import { signOutStart } from "../../redux/user/user.actions";
import HeaderMobile from "./header-mobile.component";
import HeaderDesktop from "./header-desktop.component";
import "./header.styles.scss";

const Header = ({ currentUser, signOutStart }) => {
  return (
    <nav className="header">
      <HeaderDesktop signOutStart={signOutStart} currentUser={currentUser} />
      <HeaderMobile signOutStart={signOutStart} currentUser={currentUser} />
    </nav>
  );
};

// createStructuredSelector passes state into multiple selectors
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
