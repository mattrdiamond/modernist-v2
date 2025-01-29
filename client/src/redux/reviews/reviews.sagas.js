import { takeLatest, call, put, all } from "redux-saga/effects";
import { firestore } from "../../firebase/firebase.utils";
import { doc, getDoc } from "firebase/firestore";
import { fetchReviewsSuccess, fetchReviewsFailure } from "./reviews.actions";
import ReviewsActionTypes from "./reviews.types";

export function* fetchReviewsFromDB({ payload: productId }) {
  try {
    const reviewsRef = doc(firestore, "reviews", productId.toString()); // Firestore requires document IDs to be strings
    const reviewsSnapshot = yield call(getDoc, reviewsRef);

    if (reviewsSnapshot.exists()) {
      const reviewsData = reviewsSnapshot.data();
      const { reviews } = reviewsData;

      yield put(fetchReviewsSuccess(productId, reviews));
    } else {
      throw new Error("No reviews found");
    }
  } catch (error) {
    yield put(fetchReviewsFailure(productId, error.message));
  }
}

export function* onFetchReviewsStart() {
  yield takeLatest(ReviewsActionTypes.FETCH_REVIEWS_START, fetchReviewsFromDB);
}

export function* reviewsSagas() {
  yield all([call(onFetchReviewsStart)]);
}
