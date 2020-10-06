import CheckoutActionTypes from "./checkout.types";

export const paymentStart = () => ({
  type: CheckoutActionTypes.PAYMENT_START,
});

export const paymentSuccess = () => ({
  type: CheckoutActionTypes.PAYMENT_SUCCESS,
});
