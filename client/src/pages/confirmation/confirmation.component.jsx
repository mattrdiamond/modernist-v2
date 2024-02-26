import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { checkoutComplete } from "../../redux/checkout/checkout.actions";
import { selectCheckoutConfirmation } from "../../redux/checkout/checkout.selectors";
import "./confirmation.styles.scss";

const Confirmation = ({
  confirmationData: {
    amount,
    card,
    created,
    discount,
    cartSubtotal,
    shipping,
    tax,
  },
  checkoutSessionComplete,
}) => {
  let history = useHistory();

  useEffect(() => {
    // Clear checkout data when leaving page
    let unlisten = history.listen(() => {
      //
      checkoutSessionComplete();
    });

    // When component unmounts, stop listening for changes
    return () => unlisten();
  }, [history, checkoutSessionComplete]);

  const orderDate = new Date(created * 1000); // convert timestamp into date

  // Calculate estimated delivery date (10 days from current date)
  const getDeliveryDate = () => {
    const days = 10;
    const deliveryDate = new Date(
      orderDate.getTime() + days * 24 * 60 * 60 * 1000
    );
    return deliveryDate.toDateString();
  };

  return (
    <div className='confirmation-page'>
      <div className='page-width'>
        <div className='inner-window'>
          <div className='inner-container'>
            <h2 className='title'>Thanks for shopping with us!</h2>
            <p>Your payment was processed successfully.</p>
          </div>
          <div className='inner-container'>
            <ul className='order-details'>
              <li className='order-detail'>
                <span className='label'>Order Number:</span>
                <span className='details'>
                  {Math.round(Math.random() * 10000000000)}
                </span>
              </li>
              <li className='order-detail'>
                <span className='label'>Order Date:</span>
                <span className='details'>
                  {orderDate.toLocaleDateString()}
                </span>
              </li>
              <li className='order-detail'>
                <span className='label'>Payment Method:</span>
                <span className='details'>
                  {card.brand} xxxx xxxx xxxx {card.last4}
                </span>
              </li>
              <li className='order-detail'>
                <span className='label'>Delivery Details:</span>
                <span className='details'>
                  Standard - Estimated delivery date:{" "}
                  <span>{getDeliveryDate()}</span>
                </span>
              </li>
              <li className='order-detail'>
                <span className='label'>Summary:</span>
                <ul className='order-details-inner'>
                  <li className='subtotal'>
                    <span className='label'>Subtotal</span>
                    <span className='details'>${cartSubtotal.toFixed(2)}</span>
                  </li>
                  {discount ? (
                    <li className='promo'>
                      <span className='label'>Promo</span>
                      <span className='details'>-${discount.toFixed(2)}</span>
                    </li>
                  ) : null}
                  <li className='tax'>
                    <span className='label'>Sales Tax</span>
                    <span className='details'>${tax.toFixed(2)}</span>
                  </li>
                  <li className='shipping'>
                    <span className='label'>Shipping</span>
                    <span className='details'>
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </li>
                  <li className='total'>
                    <span className='label'>Total</span>
                    <span className='details'>
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
};

const mapStateToProps = createStructuredSelector({
  confirmationData: selectCheckoutConfirmation,
});

const mapDispatchToProps = (dispatch) => ({
  checkoutSessionComplete: () => dispatch(checkoutComplete()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
