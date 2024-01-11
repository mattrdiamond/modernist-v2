import React from "react";
import { useSelector } from "react-redux";
import { selectSortedTopRatedItems } from "../../redux/shop/shop.selectors";
import useFetchAllCollections from "../../hooks/use-fetch-all-collections";

import CollectionPage from "../collection/collection.component";
import Spinner from "../../components/spinner/spinner.component";
import ErrorMessage from "../../components/error-message/error-message.component";

const TopRatedPageContainer = () => {
  const sortedTopRatedItems = useSelector(selectSortedTopRatedItems);
  const { loading, error } = useFetchAllCollections();

  if (loading && !error) {
    return <Spinner />;
  } else if (error) {
    return <ErrorMessage errorType='loading' />;
  } else if (!loading && !error && sortedTopRatedItems?.length > 0) {
    return (
      <CollectionPage title='Top-Rated' collectionItems={sortedTopRatedItems} />
    );
  } else {
    return <ErrorMessage errorType='noItemsFound' />;
  }
};

export default TopRatedPageContainer;
