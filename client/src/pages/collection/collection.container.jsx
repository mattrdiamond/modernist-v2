import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsCollectionLoaded,
  selectSortedCollectionItems,
  makeSelectCollection,
  selectCollectionsError,
} from "../../redux/shop/shop.selectors";
import { fetchCollectionStart } from "../../redux/shop/shop.actions";
import Spinner from "../../components/spinner/spinner.component";
import CollectionPage from "./collection.component";
import ErrorMessage from "../../components/error-message/error-message.component";

const CollectionPageContainer = () => {
  const { collectionId } = useParams();
  const dispatch = useDispatch();

  const collection = useSelector((state) =>
    makeSelectCollection()(state, { collectionId })
  );

  const loading = useSelector(
    (state) => !selectIsCollectionLoaded(state, { collectionId })
  );
  const sortedCollectionItems = useSelector((state) =>
    selectSortedCollectionItems(state, { collectionId })
  );
  const error = useSelector(selectCollectionsError);

  useEffect(() => {
    if (collectionId && !collection) {
      console.log("Fetching collection for ID:", collectionId);
      dispatch(fetchCollectionStart(collectionId));
    }
  }, [dispatch, collection, collectionId]);

  if (loading && !error) {
    return <Spinner />;
  } else if (error) {
    return <ErrorMessage errorType='loading' />;
  } else if (!loading && sortedCollectionItems?.length > 0 && collection) {
    return (
      <CollectionPage
        id={collection.id}
        title={collection.title}
        subtitle={collection.subtitle}
        collectionItems={sortedCollectionItems}
        heroImages={collection.banner}
      />
    );
  } else {
    return <ErrorMessage errorType='noItemsFound' />;
  }
};

export default CollectionPageContainer;
