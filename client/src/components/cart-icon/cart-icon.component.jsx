import React from "react";
import "./cart-icon.styles.scss";
import { connect } from "react-redux";
import {
  selectCartItemsCount,
  selectCartHidden,
} from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import Icon from "../icon/icon.component";

const CartIcon = ({ cartHidden, itemCount, handleClick, handleKeyPress }) => {
  console.log("render cart icon");
  return (
    <div className="cart-container">
      <div
        className={
          "cart-icon nav-icon ignore-co-cart" + (!cartHidden ? " is-open" : "")
        }
        onClick={handleClick}
        onKeyPress={handleKeyPress}
        tabIndex="0"
      >
        <div className="icon-wrapper">
          <Icon icon="shopping-bag" />
          <span className="item-count">{itemCount}</span>
        </div>
      </div>
      {cartHidden ? null : <CartDropdown />}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount,
  cartHidden: selectCartHidden,
});

export default connect(mapStateToProps)(CartIcon);
