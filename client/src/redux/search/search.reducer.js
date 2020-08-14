import SearchActionTypes from "./search.types";

const INITIAL_STATE = {
  hidden: true,
  inputValue: "",
};

const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SearchActionTypes.TOGGLE_INPUT_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
      };
    case SearchActionTypes.CLOSE_SEARCH_DRAWER:
      return {
        hidden: true,
        inputValue: "",
      };
    case SearchActionTypes.SET_INPUT_VALUE:
      return {
        ...state,
        inputValue: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;
