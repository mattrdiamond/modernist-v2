import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  collectionPropType,
  categoryItemType,
  errorPropType,
  collectionIdPropType,
} from "../../sharedPropTypes/sharedPropTypes";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
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

const CollectionPageContainer = ({
  fetchCollectionStart,
  collection,
  loading,
  collectionId,
  sortedCollectionItems,
  error,
}) => {
  useEffect(() => {
    if (!collection) {
      fetchCollectionStart(collectionId);
    }
  }, [fetchCollectionStart, collection, collectionId]);

  if (loading && !error) {
    return <Spinner />;
  } else if (error) {
    return <ErrorMessage errorType='loading' />;
  } else if (!loading && sortedCollectionItems?.length > 0) {
    return (
      <CollectionPage
        title={collection.title}
        collectionItems={sortedCollectionItems}
        heroImages={collection.banner}
      />
    );
  } else {
    return <ErrorMessage errorType='noItemsFound' />;
  }
};

const mapStateToProps = createStructuredSelector({
  collectionId: (state, ownProps) => ownProps.match.params.collectionId,
  loading: (state, ownProps) => !selectIsCollectionLoaded(state, ownProps),
  collection: (state, ownProps) => makeSelectCollection()(state, ownProps),
  sortedCollectionItems: (state, ownProps) =>
    selectSortedCollectionItems(state, ownProps),
  error: (state, ownProps) => selectCollectionsError(state, ownProps),
});

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionStart: (collectionId) =>
    dispatch(fetchCollectionStart(collectionId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionPageContainer);

CollectionPageContainer.propTypes = {
  fetchCollectionStart: PropTypes.func.isRequired,
  collection: collectionPropType,
  loading: PropTypes.bool.isRequired,
  collectionId: collectionIdPropType,
  sortedCollectionItems: PropTypes.arrayOf(categoryItemType),
  error: errorPropType,
};
