import CheckoutActionTypes from "./checkout.types";

const INITIAL_STATE = {
  isLoading: false,
  errorMessage: undefined,
};

const checkoutReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CheckoutActionTypes.CHECKOUT_START:
      console.log("START");
      return {
        ...state,
        isLoading: true,
      };
    case CheckoutActionTypes.CHECKOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default checkoutReducer;
