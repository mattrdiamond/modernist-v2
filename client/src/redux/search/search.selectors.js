import { createSelector } from "reselect";

const selectSearch = (state) => state.search;

export const selectInputHidden = createSelector(
  [selectSearch],
  (search) => search.hidden
);

export const selectInputValue = createSelector(
  [selectSearch],
  (search) => search.inputValue
);
