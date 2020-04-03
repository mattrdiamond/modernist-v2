import { takeLatest, call, put, all } from "redux-saga/effects";
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
    • yield - yields control to saga. middleware will suspend saga until the promise completes (similar to async await)
        • Also, if a second action gets called and sent to saga middleware before first one completes,
          listener effect can then determine whether or not to cancel first one from the second action that came in
    • Listener effects:
        • takeEvery() - listens for specific action types and creates a non-blocking call on each action to allow
          app to continue running (doesn't pause js for async fetch calls to come back)
          • Allows multiple actions to be started concurrently
          • second param is another generator function that will run in response to action
        • take() - takes single action param. Promise resolves with payload value. Once generator function completes,
          will not execute subsequent actions (done: true). take() is blocking vs takeEvery() which is non-blocking
        • takeLatest() - allows only 1 task to run at a time (latest). Creates new saga instance for each action.
          If you dispatch an action before previous API call finishes, it will automatically stop first call and only return latest
        • note: think of take as: I'm taking an action from the regular redux flow
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
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}

export function* shopSagas() {
  yield all([call(fetchCollectionsStart)]);
}
