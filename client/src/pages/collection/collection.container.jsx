import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCollection,
  selectIsCollectionLoaded,
} from "../../redux/shop/shop.selectors";
import { fetchCollectionStart } from "../../redux/shop/shop.actions";
import Spinner from "../../components/spinner/spinner.component";
import CollectionPage from "./collection.component";

const CollectionPageContainer = ({
  fetchCollectionStart,
  collection,
  isLoading,
  collectionId,
}) => {
  useEffect(() => {
    if (!collection) {
      fetchCollectionStart(collectionId);
    }
  }, [fetchCollectionStart, collection, collectionId]);

  return isLoading ? <Spinner /> : <CollectionPage />;
};

const mapStateToProps = createStructuredSelector({
  collectionId: (state, ownProps) => ownProps.match.params.collectionId,
  isLoading: (state, ownProps) => !selectIsCollectionLoaded(state, ownProps),
  collection: (state, ownProps) => selectCollection(state, ownProps),
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
  collection: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  collectionId: PropTypes.string.isRequired,
};
