import CheckoutActionTypes from "./checkout.types";

export const paymentStart = (paymentData) => ({
  type: CheckoutActionTypes.PAYMENT_START,
  payload: paymentData,
});

export const paymentSuccess = (confirmationData) => ({
  type: CheckoutActionTypes.PAYMENT_SUCCESS,
  payload: confirmationData,
});

export const paymentError = (error) => ({
  type: CheckoutActionTypes.PAYMENT_ERROR,
  payload: error,
});

export const checkoutComplete = () => ({
  type: CheckoutActionTypes.CHECKOUT_COMPLETE,
});
