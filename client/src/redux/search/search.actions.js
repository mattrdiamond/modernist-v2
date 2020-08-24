import SearchActionTypes from "./search.types";

export const toggleInputHidden = () => ({
  type: SearchActionTypes.TOGGLE_INPUT_HIDDEN,
});

export const setInputValue = (inputValue) => {
  return {
    type: SearchActionTypes.SET_INPUT_VALUE,
    payload: inputValue,
  };
};

export const closeSearchDrawer = () => {
  return {
    type: SearchActionTypes.CLOSE_SEARCH_DRAWER,
  };
};
