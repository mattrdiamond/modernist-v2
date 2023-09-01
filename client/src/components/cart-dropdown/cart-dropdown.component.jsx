import React, { useRef } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import {
  selectCartItems,
  selectCartSubtotal,
  selectCartHidden,
} from "../../redux/cart/cart.selectors";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import useOnClickOutside from "../../hooks/use-onclick-outside";
import useLockBodyScroll from "../../hooks/use-lock-body-scroll";
import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import "./cart-dropdown.styles.scss";

const CartDropdown = ({ cartItems, cartTotal, history, toggleCartHidden }) => {
  const cartRef = useRef();

  // Close cart when clicking outside
  useOnClickOutside(cartRef, toggleCartHidden, "ignore-co-cart");

  useLockBodyScroll();

  return (
    <div className='cart-dropdown' ref={cartRef}>
      {cartItems.length ? (
        <>
          <div className='cart-items'>
            {cartItems.map((cartItem) => (
              <CartItem
                key={cartItem.id}
                item={cartItem}
                toggleCartHidden={toggleCartHidden}
              />
            ))}
          </div>
          <span className='cart-total'>Subtotal: ${cartTotal.toFixed(2)}</span>
          <div className='btn-container'>
            <CustomButton
              className='custom-button ignore-co-cart'
              onClick={() => {
                history.push("/checkout");
                toggleCartHidden();
              }}
            >
              Checkout
            </CustomButton>
          </div>
        </>
      ) : (
        <span className='empty-message'>Your cart is empty</span>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  cartTotal: selectCartSubtotal,
  cartHidden: selectCartHidden,
});

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CartDropdown)
);
