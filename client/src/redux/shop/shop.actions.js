import ShopActionTypes from "./shop.types";

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});

export const fetchProductStart = () => ({
  type: ShopActionTypes.FETCH_PRODUCT_START,
});

export const fetchProductSuccess = (product) => ({
  type: ShopActionTypes.FETCH_PRODUCT_SUCCESS,
  payload: product,
});

export const fetchProductFailure = (errorMessage) => ({
  type: ShopActionTypes.FETCH_PRODUCT_FAILURE,
  payload: errorMessage,
});

export const toggleDropdownHidden = () => ({
  type: ShopActionTypes.TOGGLE_DROPDOWN_HIDDEN,
});

export const setSortParam = (param) => ({
  type: ShopActionTypes.SET_SORT_PARAM,
  payload: param,
});
