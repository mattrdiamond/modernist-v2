import { createSelector } from "reselect";

const selectPromo = (state) => state.promo;

export const selectInput = createSelector(
  [selectPromo],
  (promo) => promo.inputValue
);

export const selectPromoError = createSelector(
  [selectPromo],
  (promo) => promo.error
);

export const selectAppliedPromos = createSelector(
  [selectPromo],
  (promo) => promo.appliedPromos
);

export const selectPromoDataLoading = createSelector(
  [selectPromo],
  (promo) => promo.promoDataLoading
);

export const selectPromoData = createSelector(
  [selectPromo],
  (promo) => promo.promoData
);

export const selectCodeValidationLoading = createSelector(
  [selectPromo],
  (promo) => promo.codeValidationLoading
);
