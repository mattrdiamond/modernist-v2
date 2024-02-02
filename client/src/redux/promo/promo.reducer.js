import PromoActionTypes from "./promo.types";

const INITIAL_STATE = {
  inputValue: "",
  error: null,
  promoData: [],
  appliedPromos: [],
  promoDataLoading: true,
  codeValidationLoading: false,
};

const promoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PromoActionTypes.SET_PROMO_INPUT_VALUE:
      return {
        ...state,
        inputValue: action.payload,
        error: null,
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
    case PromoActionTypes.REMOVE_PROMO:
      return {
        ...state,
        appliedPromos: state.appliedPromos.filter(
          (code) => code !== action.payload
        ),
        error: null,
      };
    case PromoActionTypes.FETCH_PROMOS_START:
      return {
        ...state,
        promoDataLoading: true,
        error: null,
      };
    case PromoActionTypes.FETCH_PROMOS_SUCCESS:
      const promoData = action.payload.reduce((accumulator, promo) => {
        // Use the promo code as the key
        accumulator[promo.code] = promo;
        return accumulator;
      }, {});

      return {
        ...state,
        promoDataLoading: false,
        promoData: promoData,
      };
    case PromoActionTypes.FETCH_PROMOS_FAILURE:
      return {
        ...state,
        promoDataLoading: false,
        error: action.payload,
      };
    case PromoActionTypes.VALIDATE_PROMO_START:
      return {
        ...state,
        codeValidationLoading: true,
        inputValue: "",
        error: null,
      };
    case PromoActionTypes.VALIDATE_PROMO_SUCCESS:
      return {
        ...state,
        codeValidationLoading: false,
        appliedPromos: [...state.appliedPromos, action.payload],
      };
    case PromoActionTypes.VALIDATE_PROMO_FAILURE:
      return {
        ...state,
        codeValidationLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default promoReducer;
