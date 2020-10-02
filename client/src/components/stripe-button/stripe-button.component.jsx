import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import { clearCart } from "../../redux/cart/cart.actions";
import {
  checkoutStart,
  checkoutSuccess,
} from "../../redux/checkout/checkout.actions";
import axios from "axios";
import { withRouter } from "react-router-dom";

const StripeCheckoutButton = ({
  clearCart,
  totals,
  history,
  checkoutStart,
  checkoutTest,
}) => {
  const { total } = totals;
  const priceForStripe = Math.round(total * 100); // Stripe requires price in cents
  const publishableKey = "pk_test_q3amCytQBsYySSLChdL3bHlo00aKSAc7sW";

  // Payment request -> token object sent to express server's '/payment' route, which sends payment to Stripe
  const onToken = (token) => {
    checkoutStart();
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then((response) => {
        clearCart();
        checkoutSuccess();
        // redirect to confirmation screen
        history.replace({
          pathname: "/confirmation",
          paymentData: response.data.success,
          totals,
        });
      })
      .catch((error) => {
        console.log("Payment error: ", JSON.parse(error));
        alert(
          "There was an issue with your payment. Please make sure you use the test credit card number provided"
        );
      });
  };

  const handleClick = () => {
    alert(
      "Please use the following test credit card for payments:\nCard Number: 4242 4242 4242 4242\nExp: 01/28\nCVV: 123"
    );
  };

  console.log("test", checkoutTest);
  console.log("test2", clearCart);

  return (
    <StripeCheckout
      label="Pay Now"
      name="Modernist."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/PsU.svg"
      description={`Your total is $${total.toFixed(2)}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    >
      <button className="custom-button" onClick={handleClick}>
        Pay Now
      </button>
    </StripeCheckout>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearCart: () => dispatch(clearCart()),
  checkoutStart: () => dispatch(checkoutStart()),
});

export default withRouter(
  connect(null, mapDispatchToProps)(StripeCheckoutButton)
);
