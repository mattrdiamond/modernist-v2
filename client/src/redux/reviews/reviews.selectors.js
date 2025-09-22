import { createSelector } from "reselect";

const selectReviews = (state) => state.reviews;

// Use a constant empty array to avoid creating a new reference each time.
const EMPTY_ARRAY = [];

export const selectProductReviews = (productId) =>
  createSelector(
    [selectReviews],
    (reviews) => reviews[productId]?.reviews || EMPTY_ARRAY
  );
