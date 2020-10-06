import CheckoutActionTypes from "./checkout.types";

const INITIAL_STATE = {
  isLoading: false,
  errorMessage: undefined,
};

const checkoutReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CheckoutActionTypes.PAYMENT_START:
      return {
        ...state,
        isLoading: true,
      };
    case CheckoutActionTypes.PAYMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default checkoutReducer;
