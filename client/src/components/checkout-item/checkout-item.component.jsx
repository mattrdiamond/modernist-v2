import React from "react";
import { connect } from "react-redux";
import {
  clearItemFromCart,
  addItem,
  removeItem,
} from "../../redux/cart/cart.actions";
import Stepper from "../stepper/stepper.component";
import Icon from "../icon/icon.component";
import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <div className="checkout-item">
      <div className="col-item">
        <img className="item-img" src={imageUrl} alt={name} />
        <span className="name">{name}</span>
      </div>
      <div className="col-qty">
        <Stepper
          quantity={quantity}
          increment={() => addItem(cartItem)}
          decrement={() => removeItem(cartItem)}
        />
      </div>
      <div className="col-price">
        <span className="price">${price}</span>
      </div>
      <div className="col-close">
        <button className="remove-button" onClick={() => clearItem(cartItem)}>
          <Icon icon="close" />
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearItem: (item) => dispatch(clearItemFromCart(item)),
  addItem: (item) => dispatch(addItem(item)),
  removeItem: (item) => dispatch(removeItem(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
