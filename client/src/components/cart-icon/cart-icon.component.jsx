import React from "react";
import "./cart-icon.styles.scss";
import { connect } from "react-redux";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import {
  selectCartItemsCount,
  selectCartHidden,
} from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import Icon from "../icon/icon.component";

const CartIcon = ({ toggleCartHidden, isCartHidden, itemCount }) => {
  return (
    <div
      className="cart-icon nav-icon"
      onClick={toggleCartHidden}
      onKeyPress={toggleCartHidden}
      tabIndex="0"
    >
      <Icon icon="shopping-bag" />
      <span className="item-count">{itemCount}</span>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount,
  isCartHidden: selectCartHidden,
});

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
