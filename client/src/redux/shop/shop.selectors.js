import { createSelector } from "reselect";
import { sortAsc, sortDesc } from "../../utils/utils";

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

// select shop collection boolean value - return true if loaded, false if not loaded
export const selectIsCollectionsLoaded = createSelector(
  [selectShop],
  (shop) => !!shop.collections
);

export const selectDropdownHidden = createSelector(
  [selectShop],
  (shop) => shop.dropdownHidden
);

// if collections exists, turn collection object into array of keys, then map over them to return array of collections
// if null (not yet fetched), return an empty array
export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections) =>
    collections ? Object.keys(collections).map((key) => collections[key]) : []
);

// Returns createSelector function. Assigning makeSelectCollection() to variable in mapStateToProps returns a private copy of the selector which
// selects the collection matching the url parameter (i.e. decor). If collections doesn't exist (not yet loaded), return null
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
    // if no sort param, return unsorted items
    if (!sortParam) return items;

    const direction = sortParam.endsWith("asc") ? "asc" : "desc";
    // get sortParam value preceding underscore ('name_asc' --> 'name')
    const sortBy = sortParam.split("_")[0];

    if (direction === "asc") {
      return sortAsc(items, sortBy);
    } else {
      return sortDesc(items, sortBy);
    }
  }
);

// select collection item - first select collection and then find the item.id that matches the url (string)
export const selectItem = createSelector(
  [selectCollectionItems, (state, props) => props.match.params.itemId],
  (items, itemUrlParam) =>
    items.find((item) => item.id === parseInt(itemUrlParam))
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
