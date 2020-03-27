// listens for every action of a specific type that we pass to it
import { takeEvery } from "redux-saga/effects";
import ShopActionTypes from "./shop.types";

export function* fetchCollectionsAsync() {
  yield console.log("I am fired");
}

export function* fetchCollectionsStart() {
  /*  • yield pauses until we call .next()
      • takeEvery listens for specific action types and creates a non-blocking call to allow
        app to continue running (doesn't pause js for async fetch calls to come back)
      • We can also cancel yield actions -- if a second action gets called and sent to saga middleware before first
         one completes, it can then determine whether or not to cancel first one from the second action that came in
      • second param is another generator function that will run in response to action */
  yield takeEvery(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}
