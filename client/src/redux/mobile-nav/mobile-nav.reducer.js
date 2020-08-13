import MobileNavActionTypes from "./mobile-nav.types";

const INITIAL_STATE = {
  isAnimating: false,
  isVisible: false,
};

const mobileNavReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MobileNavActionTypes.CLOSE_NAV_START:
      return {
        ...state,
        isAnimating: true,
      };
    case MobileNavActionTypes.CLOSE_NAV_SUCCESS:
      return {
        isAnimating: false,
        isVisible: false,
      };
    case MobileNavActionTypes.OPEN_NAV:
      return {
        ...state,
        isVisible: true,
      };
    default:
      return state;
  }
};

export default mobileNavReducer;
