import React from "react";
import { withRouter } from "react-router-dom";
import "./confirmation.styles.scss";

const Confirmation = (data) => {
  console.log("data", data);
  const { paymentData, totals } = data.location;
  const { amount, payment_method_details, created } = paymentData;
  const { cartSubtotal, discount, tax, shipping } = totals;
  const orderDate = new Date(created * 1000); // convert timestamp into date
  const { card } = payment_method_details;

  // Calculate estimated delivery date (10 days from current date)
  const getDeliveryDate = () => {
    const days = 10;
    const deliveryDate = new Date(
      orderDate.getTime() + days * 24 * 60 * 60 * 1000
    );
    return deliveryDate.toDateString();
  };

  return (
    <div className="confirmation-page">
      <div className="page-width">
        <div className="inner-window">
          <div className="inner-container">
            <h2 className="title">Thanks for shopping with us!</h2>
            <p>Your payment was processed successfully.</p>
          </div>
          <div className="inner-container">
            <ul className="order-details">
              <li className="order-detail">
                <span className="label">Order Number:</span>
                <span className="details">
                  {Math.round(Math.random() * 10000000000)}
                </span>
              </li>
              <li className="order-detail">
                <span className="label">Order Date:</span>
                <span className="details">{orderDate.toLocaleString()}</span>
              </li>
              <li className="order-detail">
                <span className="label">Payment Method:</span>
                <span className="details">
                  {card.brand} xxxx xxxx xxxx {card.last4}
                </span>
              </li>
              <li className="order-detail">
                <span className="label">Delivery Details:</span>
                <span className="details">
                  Standard - Estimated delivery date:{" "}
                  <span>{getDeliveryDate()}</span>
                </span>
              </li>
              <li className="order-detail">
                <span className="label">Summary:</span>
                <ul className="order-details-inner">
                  <li className="subtotal">
                    <span className="label">Subtotal</span>
                    <span className="details">${cartSubtotal.toFixed(2)}</span>
                  </li>
                  {discount ? (
                    <li className="promo">
                      <span className="label">Promo</span>
                      <span className="details">-${discount.toFixed(2)}</span>
                    </li>
                  ) : null}
                  <li className="tax">
                    <span className="label">Sales Tax</span>
                    <span className="details">${tax.toFixed(2)}</span>
                  </li>
                  <li className="shipping">
                    <span className="label">Shipping</span>
                    <span className="details">${shipping.toFixed(2)}</span>
                  </li>
                  <li className="total">
                    <span className="label">Total</span>
                    <span className="details">
                      ${(amount / 100).toFixed(2)}
                    </span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
  // return (
  //   <div className="confirmation-page">
  //     <div className="page-width">
  //       <div className="inner-window">
  //         <div className="inner-container">
  //           <h2 className="title">Thanks for shopping with us!</h2>
  //           <p>Your payment was processed successfully.</p>
  //         </div>
  //         <div className="inner-container">
  //           <div className="order-details">
  //             <span className="label">Order Number:</span>
  //             <span className="details">
  //               {Math.round(Math.random() * 10000000000)}
  //             </span>
  //             <span className="label">Order Date:</span>
  //             <span className="details">{orderDate.toLocaleString()}</span>
  //             <span className="label">Payment Method:</span>
  //             <span className="details">
  //               {card.brand} xxxx xxxx xxxx {card.last4}
  //             </span>
  //             <span className="label">Delivery Details:</span>
  //             <span className="details">
  //               Standard - Estimated delivery date:{" "}
  //               <span>{getDeliveryDate()}</span>
  //             </span>
  //             <span className="label">Summary:</span>
  //             <ul className="order-details-inner">
  //               <li className="subtotal">
  //                 <span className="label">Subtotal</span>
  //                 <span className="details">${cartSubtotal.toFixed(2)}</span>
  //               </li>
  //               {discount ? (
  //                 <li className="promo">
  //                   <span className="label">Promo</span>
  //                   <span className="details">-${discount.toFixed(2)}</span>
  //                 </li>
  //               ) : null}
  //               <li className="tax">
  //                 <span className="label">Sales Tax</span>
  //                 <span className="details">${tax.toFixed(2)}</span>
  //               </li>
  //               <li className="shipping">
  //                 <span className="label">Shipping</span>
  //                 <span className="details">${shipping.toFixed(2)}</span>
  //               </li>
  //               <li className="total">
  //                 <span className="label">Total</span>
  //                 <span className="details">${(amount / 100).toFixed(2)}</span>
  //               </li>
  //             </ul>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default withRouter(Confirmation);
