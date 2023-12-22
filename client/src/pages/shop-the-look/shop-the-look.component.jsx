import React, { useEffect, useState } from "react";
import { createStructuredSelector } from "reselect";
import PropTypes from "prop-types";
import { hotspotData } from "../../components/curated-room/hotspot-data";
import { connect } from "react-redux";
import Spinner from "../../components/spinner/spinner.component";

import {
  selectCollections,
  selectAreAllCollectionsLoaded,
} from "../../redux/shop/shop.selectors";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";

import CollectionPage from "../collection/collection.component";

const ShopTheLook = ({
  fetchCollectionsStart,
  allCollectionsLoaded,
  hotspots,
  collections,
}) => {
  const [shopTheLookProducts, setShopTheLookProducts] = useState([]);

  useEffect(() => {
    if (!allCollectionsLoaded) {
      fetchCollectionsStart();
    }
  }, [fetchCollectionsStart, allCollectionsLoaded]);

  useEffect(() => {
    if (!allCollectionsLoaded || !hotspots) return;

    const hotspotProductData = hotspots.map((hotspot) => {
      const collection = collections[hotspot.collection];

      const product = collection?.items?.find(
        (item) => item.id === hotspot.shopId
      );

      return product || null;
    });

    setShopTheLookProducts(hotspotProductData);
  }, [collections, hotspots, allCollectionsLoaded]);

  return allCollectionsLoaded ? (
    <CollectionPage
      title='Shop the look'
      collectionItems={shopTheLookProducts}
    />
  ) : (
    <Spinner />
  );
};

const mapStateToProps = createStructuredSelector({
  allCollectionsLoaded: selectAreAllCollectionsLoaded,
  collections: selectCollections,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopTheLook);

ShopTheLook.propTypes = {
  fetchCollectionsStart: PropTypes.func.isRequired,
  allCollectionsLoaded: PropTypes.bool.isRequired,
  hotspots: PropTypes.array,
  collections: PropTypes.object,
};

ShopTheLook.defaultProps = {
  hotspots: hotspotData,
};
