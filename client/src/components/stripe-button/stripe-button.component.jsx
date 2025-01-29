import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import { paymentStart } from "../../redux/checkout/checkout.actions";
import logomark from "../../assets/icons/logomark_circle.svg";

/*  StripeCheckout sends token object to express server's '/payment' route,
    which creates the charge and sends to Stripe */

const StripeCheckoutButton = ({ totals, paymentStart }) => {
  const { total } = totals;
  const publishableKey = "pk_test_q3amCytQBsYySSLChdL3bHlo00aKSAc7sW";
  const priceForStripe = Math.round(total * 100); // Stripe requires price in cents
  const currentYear = new Date().getFullYear();
  const expirationYear = (currentYear + 4) % 100; // Set expiration to 4 years from now for Stripe test card

  const handleClick = () => {
    alert(
      `Please use the following test credit card for payments:\nCard Number: 4242 4242 4242 4242\nExp: 01/${expirationYear}\nCVV: 123`
    );
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='Modernist.'
      billingAddress
      shippingAddress
      image={logomark}
      description={`Your total is $${total.toFixed(2)}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={(token) => paymentStart({ token, priceForStripe, totals })}
      stripeKey={publishableKey}
    >
      <button className='custom-button' onClick={handleClick}>
        Pay Now
      </button>
    </StripeCheckout>
  );
};

const mapDispatchToProps = (dispatch) => ({
  paymentStart: (paymentData) => dispatch(paymentStart(paymentData)),
});

export default connect(null, mapDispatchToProps)(StripeCheckoutButton);
