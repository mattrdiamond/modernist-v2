import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import StripeCheckoutButton from "../../components/stripe-button/stripe-button.component";
import PromoForm from "../../components/promo-form/promo-form.component";
import PromoBanner from "../../components/promo-banner/promo-banner.component";
import "./checkout.styles.scss";

const CheckoutPage = ({ cartItems, cartTotal }) => {
  const taxRate = 0.0625;
  const promoCode = "supersale";
  const salesTax = cartTotal * taxRate;
  const shippingCost = 20;

  const [totals, updateTotals] = useState({
    subtotal: cartTotal,
    discount: null,
    tax: salesTax,
    shipping: shippingCost,
    total: cartTotal + salesTax + shippingCost,
  });

  const { subtotal, discount, tax, shipping, total } = totals;

  const applyPromo = (percentage) => {
    const promoDiscount = cartTotal * percentage;
    const salesTax = (cartTotal - promoDiscount) * taxRate;
    updateTotals({
      ...totals,
      discount: promoDiscount,
      tax: salesTax,
      total: cartTotal - promoDiscount + salesTax + shipping,
    });
  };

  if (!cartItems.length)
    return (
      <div className="empty-cart">
        <h1>Your shopping bag is empty</h1>
        <p>
          You have no items in your shopping bag. Check out the shop page to get
          started!
        </p>
      </div>
    );
  else
    return (
      <div className="checkout-page">
        <PromoBanner promoCode={promoCode} />
        <div className="checkout-wrapper">
          <div className="checkout-header">
            <div className="header-block">
              <span>Product</span>
            </div>
            <div className="header-block">
              <span>Description</span>
            </div>
            <div className="header-block">
              <span>Quantity</span>
            </div>
            <div className="header-block">
              <span>Price</span>
            </div>
            <div className="header-block">
              <span>Remove</span>
            </div>
          </div>
          {cartItems.map((cartItem) => (
            <CheckoutItem key={cartItem.id} cartItem={cartItem} />
          ))}
          <div className="summary-container">
            <h3 className="">Summary</h3>
            <span className="label">Subtotal:</span>
            <span className="amount">${subtotal.toFixed(2)}</span>
            {discount && (
              <>
                <span className="label promo">Promo:</span>
                <span className="amount promo">-${discount.toFixed(2)}</span>
              </>
            )}
            <span className="label">Sales Tax:</span>
            <span className="amount">${tax.toFixed(2)}</span>
            <span className="label">Shipping:</span>
            <span className="amount">${shipping.toFixed(2)}</span>
            <span className="label total">Total:</span>
            <span className="amount total">${total.toFixed(2)}</span>
          </div>
          <PromoForm applyPromo={applyPromo} validCode={promoCode} />
          <div className="test-warning">
            *Please use the following test credit card for payments*
            <br />
            4242 4242 4242 4242 - Exp: 01/28 - CVV: 123
          </div>
          <StripeCheckoutButton totals={totals} />
        </div>
      </div>
    );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  cartTotal: selectCartTotal,
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(CheckoutPage);
