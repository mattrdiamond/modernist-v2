import React from "react";
import { useSelector } from "react-redux";

import { selectSortedHotspotItems } from "../../redux/shop/shop.selectors";

import Spinner from "../../components/spinner/spinner.component";
import ErrorMessage from "../../components/error-message/error-message.component";
import CollectionPage from "../collection/collection.component";

import useFetchAllCollections from "../../hooks/use-fetch-all-collections";

const ShopTheLook = () => {
  const hotspotCollectionItems = useSelector(selectSortedHotspotItems);

  const { loading, error } = useFetchAllCollections();

  if (loading && !error) {
    return <Spinner />;
  } else if (error) {
    return <ErrorMessage errorType='loading' />;
  } else if (hotspotCollectionItems && hotspotCollectionItems?.length > 0) {
    return (
      <CollectionPage
        title='Shop the look'
        collectionItems={hotspotCollectionItems}
      />
    );
  } else {
    return <ErrorMessage errorType='noItemsFound' />;
  }
};

export default ShopTheLook;
