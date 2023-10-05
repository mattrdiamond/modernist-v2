import { createSelector } from "reselect";

const selectReviews = (state) => state.reviews;

export const selectProductReviews = (productId) =>
  createSelector([selectReviews], (reviews) =>
    reviews[productId] ? reviews[productId].reviews : []
  );
