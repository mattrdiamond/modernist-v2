import { createSelector } from "reselect";

const selectPromo = (state) => state.promo;

export const selectInput = createSelector(
  [selectPromo],
  (promo) => promo.inputValue
);

export const selectError = createSelector(
  [selectPromo],
  (promo) => promo.error
);

export const selectPromoApplied = createSelector(
  [selectPromo],
  (promo) => promo.applied
);
