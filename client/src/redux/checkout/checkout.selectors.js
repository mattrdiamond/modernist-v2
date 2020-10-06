import { createSelector } from "reselect";

const selectCheckout = (state) => state.checkout;

export const selectIsCheckoutLoading = createSelector(
  [selectCheckout],
  (checkout) => checkout.isLoading
);
