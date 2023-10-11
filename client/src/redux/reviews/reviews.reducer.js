import ReviewsActionTypes from "./reviews.types";

const INITIAL_STATE = {};

const reviewsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ReviewsActionTypes.FETCH_REVIEWS_START:
      return {
        ...state,
        [action.payload]: {
          reviews: [],
          isFetching: true,
          errorMessage: null,
        },
      };
    case ReviewsActionTypes.FETCH_REVIEWS_SUCCESS:
      return {
        ...state,
        [action.payload.productId]: {
          reviews: action.payload.reviews,
          isFetching: false,
          errorMessage: null,
        },
      };
    case ReviewsActionTypes.FETCH_REVIEWS_FAILURE:
      return {
        ...state,
        [action.payload.productId]: {
          ...state[action.payload.productId],
          isFetching: false,
          errorMessage: action.payload.errorMessage,
        },
      };
    default:
      return state;
  }
};

export default reviewsReducer;
