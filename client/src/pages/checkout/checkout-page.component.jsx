import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { createStructuredSelector } from "reselect";
import {
  selectCartItems,
  selectCartSubtotal,
} from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectApplied } from "../../redux/promo/promo.selectors";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import StripeCheckoutButton from "../../components/stripe-button/stripe-button.component";
import PromoForm from "../../components/promo-form/promo-form.component";
import PromoBanner from "../../components/promo-banner/promo-banner.component";

import "./checkout-page.styles.scss";

const CheckoutPage = ({ cartItems, cartSubtotal, promoApplied }) => {
  const taxRate = 0.0625;
  const shipping = 20;
  const tax = cartSubtotal * taxRate;
  const discount = promoApplied ? cartSubtotal * 0.2 : 0;
  const total = cartSubtotal - discount + tax + shipping;

  return (
    <div className="checkout-page-container">
      <PromoBanner promoCode="SUPERSALE" />
      <div className="checkout-page page-width">
        <div className="max-width">
          {!cartItems.length ? (
            <div className="empty">
              <h2>Your shopping bag is empty</h2>
              <Link to="/shop">
                <CustomButton>Shop Now</CustomButton>
              </Link>
            </div>
          ) : (
            <>
              <h1 className="title">Shopping bag</h1>
              <div className="checkout-wrapper">
                {/*----------- cart ---------------*/}
                <div className="left-col">
                  <div className="cart">
                    <div className="checkout-header">
                      <div className="col-description header-block">
                        <span>Item</span>
                      </div>
                      <div className="col-qty header-block">
                        <span>Qty</span>
                      </div>
                      <div className="col-price header-block">
                        <span>Price</span>
                      </div>
                      <div className="col-delete" />
                    </div>
                    {cartItems.map((cartItem) => (
                      <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                    ))}
                  </div>
                </div>
                <div className="right-col">
                  {/*----------- summary ---------------*/}
                  <div className="summary-container">
                    <h3 className="summary-title">Summary</h3>
                    <span className="label">Subtotal:</span>
                    <span className="amount">${cartSubtotal.toFixed(2)}</span>
                    {promoApplied && (
                      <>
                        <span className="label promo">Promo:</span>
                        <span className="amount promo">
                          -${discount.toFixed(2)}
                        </span>
                      </>
                    )}
                    <span className="label">Sales Tax:</span>
                    <span className="amount">${tax.toFixed(2)}</span>
                    <span className="label">Shipping:</span>
                    <span className="amount">${shipping.toFixed(2)}</span>
                    <span className="label total">Total:</span>
                    <span className="amount total">${total.toFixed(2)}</span>
                    <StripeCheckoutButton
                      totals={{ cartSubtotal, shipping, tax, discount, total }}
                    />
                  </div>
                  {/*----------- promo ---------------*/}
                  <PromoForm />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  cartSubtotal: selectCartSubtotal,
  currentUser: selectCurrentUser,
  promoApplied: selectApplied,
});

export default connect(mapStateToProps)(CheckoutPage);
