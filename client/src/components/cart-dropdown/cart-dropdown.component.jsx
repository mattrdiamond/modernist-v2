import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import {
  selectCartItems,
  selectCartSubtotal,
} from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { withRouter } from "react-router-dom";
import "./cart-dropdown.styles.scss";

const CartDropdown = ({ cartItems, cartTotal, history, toggleCartHidden }) => {
  const node = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (
        node.current.contains(e.target) ||
        e.target.classList.contains("cart-icon")
      ) {
        // clicked inside dropdown or clicked shopping icon
        return;
      }
      // outside click
      toggleCartHidden();
    };

    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function called when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [toggleCartHidden]);

  return (
    <div className="cart-dropdown" ref={node}>
      {cartItems.length ? (
        <>
          <div className="cart-items">
            {cartItems.map((cartItem) => (
              <CartItem
                key={cartItem.id}
                item={cartItem}
                toggleCartHidden={toggleCartHidden}
              />
            ))}
          </div>
          <span className="cart-total">Subtotal: ${cartTotal.toFixed(2)}</span>
          <div className="btn-container">
            <CustomButton
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
        <span className="empty-message">Your cart is empty</span>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  cartTotal: selectCartSubtotal,
});

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

// Export a new component that is "connected" to the router, giving us access to history
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CartDropdown)
);
