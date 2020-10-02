import CheckoutActionTypes from "./checkout.types";

export const checkoutStart = () => ({
  type: CheckoutActionTypes.CHECKOUT_START,
});

export const checkoutSuccess = () => ({
  type: CheckoutActionTypes.CHECKOUT_SUCCESS,
});
