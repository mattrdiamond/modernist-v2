import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import { clearCart } from "../../redux/cart/cart.actions";
import axios from "axios";
import { withRouter } from "react-router-dom";

const StripeCheckoutButton = ({ clearCart, totals, history }) => {
  const { total } = totals;
  // Stripe needs price in cents
  const priceForStripe = Math.round(total * 100);
  const publishableKey = "pk_test_q3amCytQBsYySSLChdL3bHlo00aKSAc7sW";

  // client submits payment request -> token object sent to express server's '/payment' route -> payment route sends payment charge to Stripe
  const onToken = (token) => {
    axios({
      url: "payment", // axios takes current url and adds '/payment'
      method: "post",
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then((response) => {
        clearCart();
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

  return (
    <StripeCheckout
      label="Pay Now"
      name="Modernist."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
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
});

export default withRouter(
  connect(null, mapDispatchToProps)(StripeCheckoutButton)
);
