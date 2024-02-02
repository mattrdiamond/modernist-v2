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

export const removePromo = (promoCode) => ({
  type: PromoActionTypes.REMOVE_PROMO,
  payload: promoCode,
});

export const fetchPromosStart = () => ({
  type: PromoActionTypes.FETCH_PROMOS_START,
});

export const fetchPromosSuccess = (promosData) => ({
  type: PromoActionTypes.FETCH_PROMOS_SUCCESS,
  payload: promosData,
});

export const fetchPromosFailure = (errorMessage) => ({
  type: PromoActionTypes.FETCH_PROMOS_FAILURE,
  payload: errorMessage,
});

export const validatePromoStart = (promoCode) => ({
  type: PromoActionTypes.VALIDATE_PROMO_START,
  payload: promoCode,
});

export const validatePromoSuccess = (promoData) => ({
  type: PromoActionTypes.VALIDATE_PROMO_SUCCESS,
  payload: promoData,
});

export const validatePromoFailure = (error) => ({
  type: PromoActionTypes.VALIDATE_PROMO_FAILURE,
  payload: error,
});
