import { createSelector } from "reselect";
import { sortAsc, sortDesc } from "../../utils/sort";

const collectionIds = [
  "bedding",
  "chairs",
  "decor",
  "lighting",
  "sofas",
  "tables",
];

const selectShop = (state) => state.shop;

// sortParam
export const selectSortParam = createSelector(
  [selectShop],
  (shop) => shop.sortParam
);

// Collections
export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectCollection = createSelector(
  [selectCollections, (state, props) => props.match.params.collectionId],
  (collections, collectionId) =>
    collections ? collections[collectionId] : null
);

export const selectIsCollectionFetching = createSelector(
  [selectShop],
  (shop) => shop.isFetchingCollections
);

export const selectIsCollectionLoaded = createSelector(
  [selectCollection],
  (collection) => !!collection
);

export const selectAreAllCollectionsLoaded = createSelector(
  [selectCollections],
  (collections) => {
    return collections ? collectionIds.every((id) => id in collections) : false;
  }
);

export const SelectCollectionsError = createSelector(
  [selectShop],
  (shop) => shop.collectionsError
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections) =>
    collections ? Object.keys(collections).map((key) => collections[key]) : [] // Transform object into array of collections
);

// Create a private copy of selector that selects collection based on url param
export const makeSelectCollection = () =>
  createSelector(
    [selectCollections, (state, props) => props.match.params.collectionId],
    (collections, collectionId) =>
      collections ? collections[collectionId] : null
  );

export const selectCollectionItems = createSelector(
  [selectCollection],
  (collection) => (collection ? collection.items : null)
);

export const selectSortedCollectionItems = createSelector(
  selectCollectionItems,
  selectSortParam,
  (items, sortParam) => {
    // If no sort param, return unsorted items
    if (!sortParam) return items;

    const { direction, sortBy } = sortParam;

    if (direction === "asc") {
      return sortAsc(items, sortBy);
    } else {
      return sortDesc(items, sortBy);
    }
  }
);

// Select combined items from all collections
export const selectAllCollectionItems = createSelector(
  [selectCollections],
  (collections) => {
    const collectionItemsArray = collections
      ? Object.keys(collections).map((key) => collections[key].items)
      : [];
    return [].concat.apply([], collectionItemsArray);
  }
);

// Products
export const selectProducts = createSelector(
  [selectShop],
  (shop) => shop.products
);

export const selectProductById = (productId) =>
  createSelector([selectProducts], (products) => products[productId]);

export const selectProductErrorMessage = (productId) =>
  createSelector(
    [selectProducts],
    (products) => products[productId]?.errorMessage
  );

export const selectIsProductFetching = createSelector(
  [selectShop],
  (shop) => shop.isFetchingProduct
);

// dropdown
export const selectDropdownHidden = createSelector(
  [selectShop],
  (shop) => shop.dropdownHidden
);
