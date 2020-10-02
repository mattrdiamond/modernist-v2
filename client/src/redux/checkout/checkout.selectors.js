import { createSelector } from "reselect";

const selectCheckout = (state) => state.checkout;

export const selectIsLoading = createSelector(
  [selectCheckout],
  (checkout) => checkout.isLoading
);
