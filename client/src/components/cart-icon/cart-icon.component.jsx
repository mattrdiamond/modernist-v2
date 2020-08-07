import React from "react";
import "./cart-icon.styles.scss";
import { connect } from "react-redux";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import {
  selectCartItemsCount,
  selectCartHidden,
} from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import Icon from "../icon/icon.component";

const CartIcon = ({ toggleCartHidden, cartHidden, itemCount }) => {
  const handleKeyPress = (e) => {
    if (e.key !== "Enter") return;
    toggleCartHidden();
  };

  return (
    <div className="cart-container">
      <div
        className={"cart-icon nav-icon" + (!cartHidden ? " is-open" : "")}
        onClick={toggleCartHidden}
        onKeyPress={handleKeyPress}
        tabIndex="0"
      >
        <Icon icon="shopping-bag" />
        <span className="item-count">{itemCount}</span>
      </div>
      {cartHidden ? null : <CartDropdown />}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount,
  cartHidden: selectCartHidden,
});

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
