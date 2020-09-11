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

export const selectSortParam = createSelector(
  [selectShop],
  (shop) => shop.sortParam
);

// select collection matching the collection url parameter (i.e. hats). If collections doesn't exist (not yet loaded), return null
export const selectCollection = (collectionUrlParam) =>
  createSelector([selectCollections], (collections) =>
    collections ? collections[collectionUrlParam] : null
  );

export const selectCollectionItems = (collectionUrlParam) =>
  createSelector([selectCollection(collectionUrlParam)], (collection) =>
    collection ? collection.items : null
  );

// ***********************************sort functions - move to utils
const sortAsc = (arr, property) => {
  const sorted = [...arr].sort((a, b) => (a[property] > b[property] ? 1 : -1));
  console.log("sorted", sorted);
  console.log("original", arr);
  return sorted;
};

const sortDesc = (arr, property) => {
  const sorted = [...arr].sort((a, b) => (a[property] > b[property] ? -1 : 1));
  console.log("sorted", sorted);
  console.log("original", arr);
  return sorted;
};

// ***********************************sort functions - move to utils

// select sorted collection items
export const selectSortedCollectionItems = (collectionUrlParam) =>
  createSelector(
    selectCollectionItems(collectionUrlParam),
    selectSortParam,
    // pass values from selectCollectionItems and selectSortParam into transform function:
    (items, sortParam) => {
      // if no sort param, return unsorted items
      if (!sortParam) return items;

      const direction = sortParam.endsWith("asc") ? "asc" : "desc";
      // get form's select option value before underscore ('name_asc' --> 'name')
      const sortBy = sortParam.split("_")[0];

      if (direction === "asc") {
        return sortAsc(items, sortBy);
      } else {
        return sortDesc(items, sortBy);
      }
    }
  );

// select collection item - first select collection and then find the item.id that matches the url (string)
export const selectItem = (collectionUrlParam, itemUrlParam) =>
  createSelector([selectCollection(collectionUrlParam)], (collection) =>
    collection
      ? collection.items.find((item) => item.id === parseInt(itemUrlParam))
      : null
  );

// select combined items from all collections
export const selectAllCollectionItems = createSelector(
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

export const selectDropdownHidden = createSelector(
  [selectShop],
  (shop) => shop.dropdownHidden
);
