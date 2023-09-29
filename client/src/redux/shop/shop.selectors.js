import { createSelector } from "reselect";
import { sortAsc, sortDesc } from "../../utils/sort";

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectSortParam = createSelector(
  [selectShop],
  (shop) => shop.sortParam
);

export const selectIsCollectionFetching = createSelector(
  [selectShop],
  (shop) => shop.isFetching
);

// Select shop collection boolean value - return true if loaded, false if not loaded
export const selectIsCollectionsLoaded = createSelector(
  [selectShop],
  (shop) => !!shop.collections
);

export const selectDropdownHidden = createSelector(
  [selectShop],
  (shop) => shop.dropdownHidden
);

// If collections exists, turn collection object into array of keys, then map over them to return array of collections
export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections) =>
    collections ? Object.keys(collections).map((key) => collections[key]) : []
);

// Create a private copy of selector that selects collection based on url param
export const makeSelectCollection = () =>
  createSelector(
    [selectCollections, (state, props) => props.match.params.collectionId],
    (collections, collectionId) =>
      collections ? collections[collectionId] : null
  );

export const selectCollection = createSelector(
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

// Select collection item id that matches the url param
export const selectItem = createSelector(
  [selectCollectionItems, (state, props) => props.match.params.itemId],
  (items, itemUrlParam) =>
    items.find((item) => item.id === parseInt(itemUrlParam))
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
