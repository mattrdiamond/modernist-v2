import ShopActionTypes from "./shop.types";

const INITIAL_STATE = {
  collections: null,
  isFetchingCollections: false,
  collectionsError: null,
  products: {},
  isFetchingProduct: false,
  dropdownHidden: true,
  sortParam: "",
  counter: 0,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTypes.FETCH_COLLECTIONS_START:
      return {
        ...state,
        isFetchingCollections: true,
      };
    case ShopActionTypes.FETCH_COLLECTIONS_SUCCESS:
      return {
        ...state,
        isFetchingCollections: false,
        collections: action.payload,
      };
    case ShopActionTypes.FETCH_COLLECTIONS_FAILURE:
      return {
        ...state,
        isFetchingCollections: false,
        collectionsError: action.payload,
      };
    case ShopActionTypes.FETCH_COLLECTION_START:
      return {
        ...state,
        isFetchingCollections: true,
      };
    case ShopActionTypes.FETCH_COLLECTION_SUCCESS:
      const collectionData = action.payload;
      return {
        ...state,
        isFetchingCollections: false,
        collections: {
          ...state.collections,
          ...collectionData,
        },
      };
    case ShopActionTypes.FETCH_COLLECTION_FAILURE:
      return {
        ...state,
        isFetchingCollections: false,
        errorMessage: action.payload,
      };
    case ShopActionTypes.FETCH_PRODUCT_START:
      return {
        ...state,
        products: {
          ...state.products,
          [action.payload]: {
            ...state.products[action.payload],
          },
        },
        isFetchingProduct: true,
      };
    case ShopActionTypes.FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        products: {
          ...state.products,
          [action.payload.productId]: {
            ...state.products[action.payload.productId],
            ...action.payload.productData,
          },
        },
        isFetchingProduct: false,
      };
    case ShopActionTypes.FETCH_PRODUCT_FAILURE:
      return {
        ...state,
        products: {
          ...state.products,
          [action.payload.productId]: {
            ...state.products[action.payload.productId],
            errorMessage: action.payload.error,
          },
        },
        isFetchingProduct: false,
      };
    case ShopActionTypes.TOGGLE_DROPDOWN_HIDDEN:
      return {
        ...state,
        dropdownHidden: !state.dropdownHidden,
      };
    case ShopActionTypes.SET_SORT_PARAM:
      return {
        ...state,
        sortParam: action.payload,
      };
    default:
      return state;
  }
};

export default shopReducer;
