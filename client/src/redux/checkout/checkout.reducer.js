import CheckoutActionTypes from "./checkout.types";

const INITIAL_STATE = {
  isLoading: false,
  errorMessage: undefined,
  confirmation: null,
};

const checkoutReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CheckoutActionTypes.PAYMENT_START:
      return {
        ...state,
        isLoading: true,
        errorMessage: undefined,
      };
    case CheckoutActionTypes.PAYMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        confirmation: action.payload,
      };
    case CheckoutActionTypes.CHECKOUT_COMPLETE:
      return INITIAL_STATE;
    case CheckoutActionTypes.PAYMENT_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default checkoutReducer;
