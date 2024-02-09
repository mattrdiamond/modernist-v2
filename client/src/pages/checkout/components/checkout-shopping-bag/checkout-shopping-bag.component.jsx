import React from "react";
import PropTypes from "prop-types";
import { productDetailType } from "../../../../sharedPropTypes/sharedPropTypes";
import CheckoutItem from "../../../../components/checkout-item/checkout-item.component";
import "./checkout-shopping-bag.styles.scss";

export default function CheckoutShoppingBag({
  totalQuantity,
  cartItems,
  ...props
}) {
  return (
    <section className='shopping-bag'>
      <div className='white-background-container'>
        <h1 className='checkout-title'>Shopping Bag</h1>
        <div className='shopping-bag-wrapper'>
          <div className='shopping-bag-header-row'>
            <div className='description-column column-header'>
              <span>
                {totalQuantity > 1 ? `${totalQuantity} Items` : "1 Item"}
              </span>
            </div>
            <div className='quantity-column column-header'>
              <span>Qty</span>
            </div>
            <div className='price-column column-header'>
              <span>Price</span>
            </div>
            <div className='delete-column' />
          </div>
          {cartItems.map((cartItem) => (
            <CheckoutItem
              key={`${cartItem.id}-${JSON.stringify(cartItem.selectedOptions)}`}
              cartItem={cartItem}
              {...props}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

CheckoutShoppingBag.propTypes = {
  totalQuantity: PropTypes.number,
  cartItems: PropTypes.arrayOf(productDetailType),
};
