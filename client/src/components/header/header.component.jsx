import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { selectInputHidden } from "../../redux/search/search.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
// new syntax in React for importing SVG - imports SVG directly as React component
import CartIcon from "../cart-icon/cart-icon.component";
import SearchInput from "../search-input/search-input.component";
import SearchIcon from "../search-icon/search-icon.component";
import Icon from "../icon/icon.component";
import { connect } from "react-redux";
import { signOutStart } from "../../redux/user/user.actions";
import "./header.styles.scss";

const Header = ({ currentUser, inputHidden, cartHidden, signOutStart }) => {
  const inputRef = useRef(null);

  const focusOnInput = () => {
    inputRef.current.focus();
  };

  return (
    <nav className="header">
      <div className="nav-wrapper page-width">
        <div className="nav-links left">
          <div className="nav-link-wrapper">
            {currentUser ? (
              <div className="nav-link" onClick={signOutStart}>
                Sign Out
              </div>
            ) : (
              <Link className="nav-link" to="/signin">
                Sign In
              </Link>
            )}
          </div>
          <div className="nav-link-wrapper">
            <Link className="nav-link" to="/shop">
              Shop
            </Link>
          </div>
        </div>
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
          <div
            className={
              "nav-link-wrapper cart" + (!cartHidden ? " is-open" : "")
            }
          >
            <CartIcon />
          </div>
        </div>
      </div>
      <SearchInput inputHidden={inputHidden} inputRef={inputRef} />
    </nav>
  );
  // return (
  //   <nav className="header">
  //     <div className="nav-wrapper page-width">
  //       <div className="nav-links left">
  //         {currentUser ? (
  //           <div className="nav-link" onClick={signOutStart}>
  //             Sign Out
  //           </div>
  //         ) : (
  //           <div className="nav-link-wrapper">
  //             <Link className="nav-link" to="/signin">
  //               Sign In
  //             </Link>
  //           </div>
  //         )}
  //         <div className="nav-link-wrapper">
  //           <Link className="nav-link" to="/shop">
  //             Shop
  //           </Link>
  //         </div>
  //       </div>
  //       <Link className="logo-container" to="/">
  //         <Icon icon="logo" />
  //       </Link>
  //       <div className="nav-links right">
  //         <div className="nav-link-wrapper">
  //           <Link className="nav-icon" to="/favorites">
  //             <Icon icon="heart-outline" width="20px" height="20px" />
  //           </Link>
  //         </div>
  //         <div className="nav-link-wrapper">
  //           <SearchIcon focusOnInput={focusOnInput} inputHidden={inputHidden} />
  //         </div>
  //         <div
  //           className={
  //             "nav-link-wrapper cart" + (!cartHidden ? " is-open" : "")
  //           }
  //         >
  //           <CartIcon />
  //         </div>
  //       </div>
  //     </div>
  //     <SearchInput inputHidden={inputHidden} inputRef={inputRef} />
  //   </nav>
  // );
};

// createStructuredSelector passes state into multiple selectors
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  inputHidden: selectInputHidden,
  cartHidden: selectCartHidden,
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
