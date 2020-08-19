import React, { useRef, useCallback } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { selectDropdownHidden } from "../../redux/shop/shop.selectors";
import { toggleDropdownHidden } from "../../redux/shop/shop.actions";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import Icon from "../icon/icon.component";
import CartIcon from "../cart-icon/cart-icon.component";
import ArrowButton from "../arrow-button/arrow-button.component";
import ShopDropdown from "../shop-dropdown/shop-dropdown.component";
import SearchIcon from "../search-icon/search-icon.component";
import SearchDrawer from "../search-drawer/search-drawer.component";
import "./header.styles.scss";

const HeaderDesktop = ({
  signOutStart,
  currentUser,
  shopDropdownHidden,
  toggleShopDropdown,
  handleCartClick,
  handleCartKeyPress,
}) => {
  const inputRef = useRef(null);

  const focusOnInput = useCallback(() => {
    inputRef.current.focus();
  }, [inputRef]);

  const shopDropdownKeyPress = (e) => {
    if (e.key === "Enter") toggleShopDropdown();
  };

  console.log("render header desktop");

  return (
    <>
      <div className="nav-wrapper page-width desktop-nav">
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
            <div
              className={
                "nav-link ignore-co-shop" +
                (!shopDropdownHidden ? " is-open" : "")
              }
              onClick={toggleShopDropdown}
              onKeyPress={shopDropdownKeyPress}
              tabIndex="0"
              role="button"
              aria-haspopup="true"
              aria-expanded={shopDropdownHidden ? false : true}
            >
              Shop
              <ArrowButton
                isClosed={shopDropdownHidden}
                styleName="ignore-co-shop"
              />
            </div>
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
          <Icon icon="modernist" />
        </Link>
        <div className="nav-links right">
          <div className="nav-link-wrapper">
            <Link className="nav-icon" to="/favorites">
              <Icon icon="favorites-desktop" width="20px" height="20px" />
            </Link>
          </div>
          <div className="nav-link-wrapper">
            <SearchIcon focusOnInput={focusOnInput} />
          </div>
          <div className="nav-link-wrapper">
            <CartIcon
              handleClick={handleCartClick}
              handleKeyPress={handleCartKeyPress}
            />
          </div>
        </div>
      </div>
      <SearchDrawer inputRef={inputRef} />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  shopDropdownHidden: selectDropdownHidden,
});

const mapDispatchToProps = (dispatch) => ({
  toggleShopDropdown: () => dispatch(toggleDropdownHidden()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderDesktop);
