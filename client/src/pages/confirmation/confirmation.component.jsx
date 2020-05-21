import React from "react";

const Confirmation = (data) => {
  console.log("CONFIRMATION", data);
  const { success } = data.location.state.response;
  return (
    <div className="confirmation-page">
      <h1>Thanks for shopping with us!</h1>
      <p>
        Your payment of ${(success.amount / 100).toFixed(2)} was processed
        successfully.
      </p>
    </div>
  );
};

export default Confirmation;
