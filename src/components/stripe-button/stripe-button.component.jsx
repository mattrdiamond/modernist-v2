import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  // Stripe needs price in cents
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_q3amCytQBsYySSLChdL3bHlo00aKSAc7sW";

  // token is onSuccess callback triggered when payment submitted
  // We could pass token to back-end to create charge, but we're not actually processing a real payment
  const onToken = token => {
    console.log("token", token);
    alert("Payment Successful");
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

export default StripeCheckoutButton;
