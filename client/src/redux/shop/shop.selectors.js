import { createSelector } from "reselect";
import { hotspotData } from "../../components/curated-room/hotspot-data";
import { selectFavorites } from "../user/user.selectors";
import { applySortParam } from "../../utils/sort";

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
  [selectCollections, (state, props) => props.collectionId],
  (collections, collectionId) =>
    collections ? collections[collectionId] : null
);

export const selectIsFetchingCollections = createSelector(
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

export const selectCollectionsError = createSelector(
  [selectShop],
  (shop) => shop.collectionsError
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections) =>
    collections ? Object.keys(collections).map((key) => collections[key]) : [] // Transform object into array of collections
);

// Create a private copy of selector that selects collection based on url param, allowing multiple instances of the selector for each collectionId
export const makeSelectCollection = () =>
  createSelector(
    [selectCollections, (state, props) => props.collectionId],
    (collections, collectionId) =>
      collections ? collections[collectionId] : null
  );

export const selectCollectionItems = createSelector(
  [selectCollection],
  (collection) => (collection ? collection.items : [])
);

export const selectSortedCollectionItems = createSelector(
  selectCollectionItems,
  selectSortParam,
  (items, sortParam) => applySortParam(items, sortParam)
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

export const selectBestsellerItems = createSelector(
  [selectAllCollectionItems],
  (allItems) =>
    allItems.filter((item) => item.tags && item.tags.bestseller === true)
);

export const selectSortedBestsellers = createSelector(
  selectBestsellerItems,
  selectSortParam,
  (bestsellers, sortParam) => {
    return applySortParam(bestsellers, sortParam);
  }
);

export const selectTopRatedItems = createSelector(
  [selectAllCollectionItems],
  (allItems) =>
    allItems.filter((item) => item.tags && item.tags["top-rated"] === true)
);

export const selectSortedTopRatedItems = createSelector(
  selectTopRatedItems,
  selectSortParam,
  (topRatedItems, sortParam) => {
    return applySortParam(topRatedItems, sortParam);
  }
);

export const selectNewItems = createSelector(
  [selectAllCollectionItems],
  (allItems) => allItems.filter((item) => item.tags && item.tags.new === true)
);

export const selectSortedNewItems = createSelector(
  selectNewItems,
  selectSortParam,
  (newItems, sortParam) => {
    return applySortParam(newItems, sortParam);
  }
);

export const selectHotspotItems = createSelector(
  [selectCollections],
  (collections) => {
    if (!collections) return [];

    const hotspotItems = hotspotData.map((hotspot) => {
      const collection = collections[hotspot.collection];

      const product = collection?.items?.find(
        (item) => item.id === hotspot.shopId
      );

      return product || null;
    });
    return hotspotItems;
  }
);

export const selectSortedHotspotItems = createSelector(
  selectHotspotItems,
  selectSortParam,
  (hotspotItems, sortParam) => {
    return applySortParam(hotspotItems, sortParam);
  }
);

export const selectSortedFavorites = createSelector(
  selectFavorites,
  selectSortParam,
  (favorites, sortParam) => {
    let favoritesArray = [];
    if (favorites !== null && typeof favorites !== "undefined") {
      favoritesArray = Object.values(favorites);
    }
    return applySortParam(favoritesArray, sortParam);
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
