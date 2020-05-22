import React from "react";
import "./confirmation.styles.scss";

const Confirmation = (data) => {
  console.log("CONFIRMATION", data);
  console.log();
  const { amount, payment_method_details, created } = data.location.state;
  const { card } = payment_method_details;

  return (
    <div className="confirmation-page">
      <h1>Thanks for shopping with us!</h1>
      <p>Your payment was processed successfully.</p>
      <h3>Order Details:</h3>
      <div className="confirmation-details">
        <span className="label">Order Number</span>
        <span className="details">
          {Math.round(Math.random() * 10000000000)}
        </span>
        <span className="label">Payment Total</span>
        <span className="details">{(amount / 100).toFixed(2)}</span>
        <span className="label">Payment Method</span>
        <span className="details">
          {card.brand} xxxx xxxx xxxx {card.last4}
        </span>
        <span className="label">Payment Date</span>
        <span className="details">
          {new Date(created * 1000).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default Confirmation;
