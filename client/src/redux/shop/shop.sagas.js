import { takeLatest, call, put, all } from "redux-saga/effects";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import {
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

// Initialize Firestore
const firestore = getFirestore();

export function* fetchCollectionsAsync() {
  try {
    const collectionRef = collection(firestore, "collections");

    // 1. Fetch snapshot obj from firestore
    const snapshot = yield call(getDocs, collectionRef);

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
    const collectionQuery = query(
      collection(firestore, "collections"),
      where("collectionId", "==", payload)
    );

    // Get the query snapshot
    const snapshot = yield call(getDocs, collectionQuery);

    // Check if a document was found
    const collectionData = transformCollectionData(snapshot);

    if (collectionData) {
      yield put(fetchCollectionSuccess(collectionData));
    } else {
      yield put(fetchCollectionFailure("Collection not found"));
    }
  } catch (error) {
    console.log("error", error);
    yield put(fetchCollectionFailure(error.message));
  }
}

export function* fetchProductAsync({ payload }) {
  const productId = payload;
  try {
    const productRef = doc(firestore, "products", productId);
    const productSnapshot = yield call(getDoc, productRef);

    if (productSnapshot.exists()) {
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
