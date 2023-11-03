import React from "react";
import "./checkout-summary.styles.scss";
import PropTypes from "prop-types";
import FreeShippingProgress from "./checkout-free-shipping-progress.component";
import StripeCheckoutButton from "../../../components/stripe-button/stripe-button.component";

export default function CheckoutSummary({
  cartSubtotal,
  promoApplied,
  shipping,
  tax,
  discount,
  total,
}) {
  return (
    <div className='checkout-summary-wrapper'>
      <h2 className='summary-title'>Order Summary</h2>
      <div className='summary-item-container'>
        <div className='summary-item-category'>
          <p className='summary-item'>
            <span className='summary-label'>Subtotal:</span>
            <span className='summary-value'>${cartSubtotal.toFixed(2)}</span>
          </p>
          {promoApplied && (
            <p className='summary-item'>
              <span className='summary-label promo'>Promo:</span>
              <span className='summary-value promo'>
                -${discount.toFixed(2)}
              </span>
            </p>
          )}
          <p className='summary-item'>
            <span className='summary-label'>Sales Tax:</span>
            <span className='summary-value'>${tax.toFixed(2)}</span>
          </p>
        </div>
        <div className='summary-item-category'>
          <p className='summary-item shipping'>
            <span className='summary-label'>Shipping:</span>
            <span className='summary-value'>
              {shipping === 0 ? "Free" : `$${cartSubtotal.toFixed(2)}`}
            </span>
          </p>
          <FreeShippingProgress subtotal={cartSubtotal} shipping={shipping} />
        </div>
        <p className='summary-item total'>
          <span className='summary-label total'>Total:</span>
          <span className='summary-value total'>${total.toFixed(2)}</span>
        </p>
      </div>
      <StripeCheckoutButton
        totals={{ cartSubtotal, shipping, tax, discount, total }}
      />
    </div>
  );
}

CheckoutSummary.propTypes = {
  cartSubtotal: PropTypes.number.isRequired,
  promoApplied: PropTypes.bool.isRequired,
  shipping: PropTypes.number.isRequired,
  tax: PropTypes.number.isRequired,
  discount: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};
