import { createSelector } from "reselect";

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

// if collections exists, turn collection object into array of keys, then map over them to return array of collections
// if null (collections initial state), return an empty version of collections --> []
export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections) =>
    collections ? Object.keys(collections).map((key) => collections[key]) : []
);

// select collection matching the collection url parameter (i.e. hats). If collections doesn't exist (not yet loaded), return null
export const selectCollection = (collectionUrlParam) =>
  createSelector([selectCollections], (collections) =>
    collections ? collections[collectionUrlParam] : null
  );

export const selectCollectionItems = createSelector(
  [selectCollections],
  (collections) => {
    const collectionItemsArray = collections
      ? Object.keys(collections).map((key) => collections[key].items)
      : [];
    return [].concat.apply([], collectionItemsArray);
  }
);

export const selectIsCollectionFetching = createSelector(
  [selectShop],
  (shop) => shop.isFetching
);

// select shop collection boolean value - return true if loaded, false if not loaded
export const selectIsCollectionsLoaded = createSelector(
  [selectShop],
  (shop) => !!shop.collections
);
