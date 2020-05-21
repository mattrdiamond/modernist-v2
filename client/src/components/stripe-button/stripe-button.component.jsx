import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { withRouter } from "react-router-dom";

const StripeCheckoutButton = ({ price, history }) => {
  // Stripe needs price in cents
  const priceForStripe = price * 100;
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
        alert("Payment successful");
        console.log("response", response.data);
        history.push("/confirmation", {
          response: response.data,
          price: price,
        });
      })
      .catch((error) => {
        console.log("Payment error: ", JSON.parse(error));
        alert(
          "There was an issue with your payment. Please make sure you use the test credit card number provided"
        );
      });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    >
      <button className="custom-button">Pay Now</button>
    </StripeCheckout>
  );
};

export default withRouter(StripeCheckoutButton);
