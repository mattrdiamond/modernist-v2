import { takeLatest, call, put, all } from "redux-saga/effects";
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";
import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
} from "./shop.actions";
import ShopActionTypes from "./shop.types";

export function* fetchCollectionsAsync() {
  try {
    const collectionRef = firestore.collection("collections");

    // 1. Fetch snapshot obj from firestore
    const snapshot = yield collectionRef.get();

    // 2. Convert snapshot's docs array into new object, and include properties needed for front end
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );

    // 3. Update reducer with collectionsMap and set isFetching to false
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

export function* fetchCollectionsStart() {
  // set isFetching to true, then start async saga
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}

export function* shopSagas() {
  yield all([call(fetchCollectionsStart)]);
}
