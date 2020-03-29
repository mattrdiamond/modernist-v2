// listens for every action of a specific type that we pass to it
import { takeEvery, call, put } from "redux-saga/effects";
import {
  firestore,
  convertCollectionsSnapshotToMap
} from "../../firebase/firebase.utils";
import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure
} from "./shop.actions";
import ShopActionTypes from "./shop.types";

/* Redux Saga Notes
    • yield pauses execution until we call .next()
    • takeEvery() listens for specific action types and creates a non-blocking call to allow
      app to continue running (doesn't pause js for async fetch calls to come back)
      • second param is another generator function that will run in response to action
    • We can also cancel yield actions -- if a second action gets called and sent to saga middleware before first
      one completes, it can then determine whether or not to cancel first one from the second action that came in
    • call() invokes method in first param, passing second param as argument
    • put() is the saga effect for creating actions - exactly like dispatch, only requires yield
*/

export function* fetchCollectionsAsync() {
  try {
    const collectionRef = firestore.collection("collections");

    // 1. fetch snapshot obj from firestore
    const snapshot = yield collectionRef.get();
    // 2. convert snapshot's docs property (array) into new object, only including properties needed for front end
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
  yield takeEvery(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}
