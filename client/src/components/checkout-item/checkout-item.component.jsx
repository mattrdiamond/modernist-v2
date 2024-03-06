import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { baseImgUrl } from "../../utils/constants";
import {
  clearItemFromCart,
  addItemToCart,
  removeItemFromCart,
} from "../../redux/cart/cart.actions";
import Stepper from "../stepper/stepper.component";
import Icon from "../icon/icon.component";
import ImageLoader from "../image-loader/image-loader.component";
import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem }) => {
  const dispatch = useDispatch();

  const {
    name,
    images,
    price,
    quantity,
    selectedOptions,
    collection,
    id,
    discountedPrice,
    discountApplied,
  } = cartItem;

  return (
    <div className='checkout-item'>
      <div className='checkout-item-img-container'>
        <ImageLoader
          styles='item-img'
          src={baseImgUrl + images.small}
          alt={name}
        />
      </div>
      <div className='content-wrapper'>
        <div className='description-column'>
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
        <div className='quantity-column'>
          <Stepper
            quantity={quantity}
            increment={() => dispatch(addItemToCart(cartItem, 1))}
            decrement={() => dispatch(removeItemFromCart(cartItem, 1))}
          />
        </div>
        <div className='price-column'>
          {discountApplied ? (
            <>
              <span className='discounted-price red-text'>
                ${discountedPrice.toFixed(2)}
              </span>
              <span className='original-price strikethrough'>
                ${price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className='original-price'>${price.toFixed(2)}</span>
          )}
        </div>
        <div className='delete-column'>
          <button
            className='remove-button'
            onClick={() => dispatch(clearItemFromCart(cartItem))}
          >
            <Icon icon='remove' title='remove' />
            <span className='remove-text text-link'>Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutItem;
