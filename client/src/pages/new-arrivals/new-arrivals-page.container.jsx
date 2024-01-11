import React from "react";
import { useSelector } from "react-redux";
import { selectSortedNewItems } from "../../redux/shop/shop.selectors";
import useFetchAllCollections from "../../hooks/use-fetch-all-collections";

import CollectionPage from "../collection/collection.component";
import Spinner from "../../components/spinner/spinner.component";
import ErrorMessage from "../../components/error-message/error-message.component";

const NewArrivalsPageContainer = () => {
  const sortedNewItems = useSelector(selectSortedNewItems);
  const { loading, error } = useFetchAllCollections();

  if (loading && !error) {
    return <Spinner />;
  } else if (error) {
    return <ErrorMessage errorType='loading' />;
  } else if (!loading && sortedNewItems?.length > 0) {
    return (
      <CollectionPage title='New Arrivals' collectionItems={sortedNewItems} />
    );
  } else {
    return <ErrorMessage errorType='noItemsFound' />;
  }
};

export default NewArrivalsPageContainer;
