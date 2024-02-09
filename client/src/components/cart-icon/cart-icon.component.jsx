import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  getTotalQuantity,
  selectCartHidden,
} from "../../redux/cart/cart.selectors";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import Icon from "../icon/icon.component";
import "./cart-icon.styles.scss";

const CartIcon = ({ cartHidden, itemCount, handleClick, handleKeyPress }) => (
  <div className='cart-container'>
    <div
      className={
        "cart-icon nav-icon ignore-co-cart" + (!cartHidden ? " is-open" : "")
      }
      onClick={handleClick}
      onKeyDown={handleKeyPress}
      tabIndex='0'
    >
      <div className='icon-wrapper'>
        <Icon icon='shopping-bag' title='shopping bag' />
        <span className='item-count'>{itemCount}</span>
      </div>
    </div>
    {cartHidden ? null : <CartDropdown />}
  </div>
);

const mapStateToProps = createStructuredSelector({
  itemCount: getTotalQuantity,
  cartHidden: selectCartHidden,
});

export default connect(mapStateToProps)(CartIcon);
