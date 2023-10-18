import ReviewsActionTypes from "./reviews.types";

export const fetchReviewsStart = (productId) => ({
  type: ReviewsActionTypes.FETCH_REVIEWS_START,
  payload: productId,
});

export const fetchReviewsSuccess = (productId, reviews) => ({
  type: ReviewsActionTypes.FETCH_REVIEWS_SUCCESS,
  payload: { productId, reviews },
});

export const fetchReviewsFailure = (productId, errorMessage) => ({
  type: ReviewsActionTypes.FETCH_REVIEWS_FAILURE,
  payload: { productId, errorMessage },
});
