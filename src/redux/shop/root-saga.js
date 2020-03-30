import { all, call } from "redux-saga/effects";
import { fetchCollectionsStart } from "./shop/shop.sagas";

// yield all() accepts an array of generators that we initialize all at once (don't have to wait for other yield actions to complete)

export default function* rootSaga() {
  yield all([call(fetchCollectionsStart)]);
}
