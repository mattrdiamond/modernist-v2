import ShopActionTypes from "./shop.types";
import {
  firestore,
  convertCollectionsSnapshotToMap
} from "../../firebase/firebase.utils";

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionsMap => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
});

// async action creator - when dispatching function instead of object, redux-thunk will call that function with dispatch functionality
export const fetchCollectionsStartAsync = () => {
  return dispatch => {
    const collectionRef = firestore.collection("collections");
    // 1. set isFetching to true before starting async
    dispatch(fetchCollectionsStart());
    // 2. fetch snapshot obj from firestore
    collectionRef
      .get()
      .then(snapshot => {
        // 3. convert snapshot's docs property (array) into new object and only include properties needed for front end
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        // 4. Update reducer with collectionsMap and set isFetching to false
        dispatch(fetchCollectionsSuccess(collectionsMap));
      })
      .catch(error => dispatch(fetchCollectionsFailure(error.message)));
  };
};
