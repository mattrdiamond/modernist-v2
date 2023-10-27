import { takeLatest, call, put, all } from "redux-saga/effects";
import {
  firestore,
  transformCollectionsData,
  transformCollectionData,
} from "../../firebase/firebase.utils";
import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
  fetchCollectionSuccess,
  fetchCollectionFailure,
  fetchProductSuccess,
  fetchProductFailure,
} from "./shop.actions";
import ShopActionTypes from "./shop.types";

export function* fetchCollectionsAsync() {
  try {
    const collectionRef = firestore.collection("collections");

    // 1. Fetch snapshot obj from firestore
    const snapshot = yield collectionRef.get();

    // 2. Convert snapshot's docs array into new object, and include properties needed for front end
    const collectionsMap = transformCollectionsData(snapshot);

    // 3. Update reducer with collectionsMap and set isFetching to false
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

export function* fetchCollectionAsync({ payload }) {
  try {
    const collectionQuery = firestore
      .collection("collections")
      .where("collectionId", "==", payload);

    // Get the query snapshot
    const snapshot = yield collectionQuery.get();

    // Check if a document was found
    const collectionData = transformCollectionData(snapshot);

    if (collectionData) {
      yield put(fetchCollectionSuccess(collectionData));
    } else {
      yield put(fetchCollectionFailure("Collection not found"));
    }
  } catch (error) {
    yield put(fetchCollectionFailure(error.message));
  }
}

export function* fetchProductAsync({ payload }) {
  const productId = payload;
  try {
    const productRef = firestore.collection("products").doc(productId);
    const productSnapshot = yield productRef.get();

    if (productSnapshot.exists) {
      const productData = productSnapshot.data();
      yield put(fetchProductSuccess(productId, productData));
    } else {
      yield put(fetchProductFailure(productId, "Product not found"));
    }
  } catch (error) {
    // Handle other errors like network issues or server errors
    yield put(fetchProductFailure(error.message));
  }
}

export function* fetchCollectionsStart() {
  // set isFetching to true, then start async saga
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}

export function* fetchCollectionStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTION_START,
    fetchCollectionAsync
  );
}

export function* fetchProductStart() {
  yield takeLatest(ShopActionTypes.FETCH_PRODUCT_START, fetchProductAsync);
}

export function* shopSagas() {
  yield all([
    call(fetchCollectionsStart),
    call(fetchCollectionStart),
    call(fetchProductStart),
  ]);
}
