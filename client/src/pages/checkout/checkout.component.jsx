import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import StripeCheckoutButton from "../../components/stripe-button/stripe-button.component";
import FormInput from "../../components/form-input/form-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import PromoBanner from "../../components/promo-banner/promo-banner.component";
import "./checkout.styles.scss";

const CheckoutPage = ({ cartItems, cartTotal, currentUser }) => {
  const shipping = 99;
  const salesTax = cartTotal * 0.0625;

  const [promoCode, setPromoCode] = useState({
    validCode: "supersale",
    input: "",
    error: null,
    applied: false,
    discount: 0.2,
  });

  const { validCode, input, error } = promoCode;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (input.toLowerCase() !== validCode.toLowerCase()) {
      return setPromoCode({
        ...promoCode,
        error: "Your promo could not be applied. Please try again!",
      });
    } else if (
      input.toLowerCase() === validCode.toLowerCase() &&
      promoCode.applied
    ) {
      return setPromoCode({
        ...promoCode,
        error: "Promo has already been applied.",
      });
    }
    setPromoCode({
      ...promoCode,
      input: "",
      applied: true,
    });
  };

  const handleChange = (e) => {
    const { value } = e.target;

    // clear error if showing
    if (promoCode.error) {
      setPromoCode({
        ...promoCode,
        input: value,
        error: null,
      });
    } else {
      setPromoCode({
        ...promoCode,
        input: value,
      });
    }
  };

  console.log("user", currentUser);

  if (cartItems.length) {
    return (
      <div className="checkout-page">
        <PromoBanner promoCode={validCode} />
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
            <span className="amount">${cartTotal.toFixed(2)}</span>
            {promoCode.applied && (
              <>
                <span className="label">Discount:</span>
                <span className="amount">
                  -${(cartTotal * promoCode.discount).toFixed(2)}
                </span>
              </>
            )}
            <span className="label">Sales Tax:</span>
            <span className="amount">${salesTax.toFixed(2)}</span>
            <span className="label">Shipping:</span>
            <span className="amount">${shipping.toFixed(2)}</span>
            <span className="label total">Total:</span>
            <span className="amount total">
              $
              {promoCode.applied
                ? (
                    cartTotal -
                    cartTotal * promoCode.discount +
                    salesTax +
                    shipping
                  ).toFixed(2)
                : (cartTotal + salesTax + shipping).toFixed(2)}
            </span>
          </div>
          <div className="promo-container">
            <span>Add a promo or gift card</span>
            <form className="promo-form" onSubmit={handleSubmit}>
              <FormInput
                name="promo"
                handleChange={handleChange}
                type="text"
                value={input}
                placeholder="Promo or gift card"
                required
              />
              <CustomButton
                type="button"
                onClick={handleSubmit}
                disabled={!promoCode}
              >
                Apply
              </CustomButton>
            </form>
            {error ? <div className="alert-container">{error}</div> : null}
          </div>
          <div className="test-warning">
            *Please use the following test credit card for payments*
            <br />
            4242 4242 4242 4242 - Exp: 01/28 - CVV: 123
          </div>
          <StripeCheckoutButton price={cartTotal} />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Your cart is empty</h1>
        {!currentUser && (
          <p>
            If you have an account, sign in to see items added on earlier
            visits.
          </p>
        )}
      </div>
    );
  }
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  cartTotal: selectCartTotal,
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(CheckoutPage);
