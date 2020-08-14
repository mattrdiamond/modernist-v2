import PromoActionTypes from "./promo.types";

export const setPromoInputValue = (input) => ({
  type: PromoActionTypes.SET_PROMO_INPUT_VALUE,
  payload: input,
});

export const clearError = (input) => ({
  type: PromoActionTypes.CLEAR_ERROR,
  payload: input,
});

export const throwError = (error) => ({
  type: PromoActionTypes.THROW_ERROR,
  payload: error,
});

export const applyPromo = () => ({
  type: PromoActionTypes.APPLY_PROMO,
});
