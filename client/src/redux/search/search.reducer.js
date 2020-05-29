import SearchActionTypes from "./search.types";

const INITIAL_STATE = {
  hidden: true,
};

const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SearchActionTypes.TOGGLE_INPUT_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
      };
    default:
      return state;
  }
};

export default searchReducer;
