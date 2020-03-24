import ShopActionTypes from "./shop.types";
import {
  firestore,
  convertCollectionsSnapshotToMap
} from "../../firebase/firebase.utils";

export const fetchCollectionsStart = collectionsMap => ({
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

export const fetchCollectionsStartAsync = () => {
  return dispatch => {
    const collectionRef = firestore.collection("collections");
    // set isFetching to true before starting async
    dispatch(fetchCollectionsStart());

    // .get() makes api call to fetch the data associated with collectionRef (snapshot obj from firestore)
    collectionRef
      .get()
      .then(snapshot => {
        // convert snapshot's docs property (array) into new object and only include properties needed for front end
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        // Update reducer with collectionsMap and set isFetching to false
        dispatch(fetchCollectionsSuccess(collectionsMap));
      })
      .catch(error => dispatch(fetchCollectionsFailure(error.message)));
  };
};
