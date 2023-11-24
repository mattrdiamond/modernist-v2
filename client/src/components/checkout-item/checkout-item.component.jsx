import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearItemFromCart,
  addItem,
  removeItem,
} from "../../redux/cart/cart.actions";
import Stepper from "../stepper/stepper.component";
import Icon from "../icon/icon.component";
import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
  const { name, images, price, quantity, selectedOptions, collection, id } =
    cartItem;

  return (
    <div className='checkout-item'>
      <img className='item-img' src={images.small} alt={name} />
      <div className='content-wrapper'>
        <div className='col-description'>
          <Link
            to={`/shop/${collection}/${id}`}
            className='item-name line-clamp-2'
          >
            {name}
          </Link>
          {selectedOptions &&
            Object.keys(selectedOptions).length > 0 &&
            Object.entries(selectedOptions).map(([category, option], index) => (
              <p key={index} className='item-option'>
                <span className='option-category'>{`${category}: `}</span>
                <span className='option-value'>{option.value}</span>
              </p>
            ))}
        </div>
        <div className='col-qty'>
          <Stepper
            quantity={quantity}
            increment={() => addItem(cartItem)}
            decrement={() => removeItem(cartItem)}
          />
        </div>
        <div className='col-price'>
          <span className='price'>${price.toFixed(2)}</span>
        </div>
        <div className='col-delete'>
          <button className='remove-button' onClick={() => clearItem(cartItem)}>
            <Icon icon='remove' />
            <span className='remove-text text-link'>Remove</span>
          </button>
        </div>
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
