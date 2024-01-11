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

export const fetchCollectionStart = (collectionId) => ({
  type: ShopActionTypes.FETCH_COLLECTION_START,
  payload: collectionId,
});

export const fetchCollectionSuccess = (collectionData) => ({
  type: ShopActionTypes.FETCH_COLLECTION_SUCCESS,
  payload: collectionData,
});

export const fetchCollectionFailure = (errorMessage) => ({
  type: ShopActionTypes.FETCH_COLLECTION_FAILURE,
  payload: errorMessage,
});

export const fetchProductStart = (productId) => ({
  type: ShopActionTypes.FETCH_PRODUCT_START,
  payload: productId,
});

export const fetchProductSuccess = (productId, productData) => ({
  type: ShopActionTypes.FETCH_PRODUCT_SUCCESS,
  payload: { productId, productData },
});

export const fetchProductFailure = (productId, error) => ({
  type: ShopActionTypes.FETCH_PRODUCT_FAILURE,
  payload: { productId, error },
});

export const toggleShopDropdown = () => ({
  type: ShopActionTypes.TOGGLE_SHOP_DROPDOWN,
});

export const setSortParam = (param) => ({
  type: ShopActionTypes.SET_SORT_PARAM,
  payload: param,
});
