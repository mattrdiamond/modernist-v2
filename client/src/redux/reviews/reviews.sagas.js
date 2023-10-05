import { takeLatest, call, put, all } from "redux-saga/effects";
import { firestore } from "../../firebase/firebase.utils";
import { fetchReviewsSuccess, fetchReviewsFailure } from "./reviews.actions";
import ReviewsActionTypes from "./reviews.types";

export function* fetchReviewsFromDB({ payload: productId }) {
  try {
    const reviewsRef = firestore
      .collection("reviews")
      .doc(productId.toString()); // firestore requires document IDs to be strings

    const reviewsSnapshot = yield reviewsRef.get();
    const reviewsData = reviewsSnapshot.data();
    const { reviews } = reviewsData;

    yield put(fetchReviewsSuccess(productId, reviews));
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
