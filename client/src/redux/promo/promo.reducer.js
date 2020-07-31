import PromoActionTypes from "./promo.types";

const INITIAL_STATE = {
  inputValue: "",
  error: null,
  applied: false,
};

const promoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PromoActionTypes.SET_INPUT_VALUE:
      return {
        ...state,
        inputValue: action.payload,
      };
    case PromoActionTypes.THROW_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case PromoActionTypes.CLEAR_ERROR:
      return {
        ...state,
        inputValue: action.payload,
        error: null,
      };
    case PromoActionTypes.APPLY_PROMO:
      return {
        ...state,
        inputValue: "",
        error: null,
        applied: true,
      };
    default:
      return state;
  }
};

export default promoReducer;
