import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectFavorites = createSelector(
  [selectUser],
  (user) => user.favorites
);

export const selectIsUserFetching = createSelector(
  [selectUser],
  (user) => user.isFetching
);

export const selectErrorMessage = createSelector([selectUser], (user) =>
  user.error ? user.error.message : null
);
