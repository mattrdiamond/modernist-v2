import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import useFetchAllCollections from "../../hooks/use-fetch-all-collections";
import {
  selectCollections,
  selectAreAllCollectionsLoaded,
} from "../../redux/shop/shop.selectors";
import CollectionsOverview from "./collections-overview.component";
import Spinner from "../../components/spinner/spinner.component";
import ErrorMessage from "../../components/error-message/error-message.component";

const CollectionsOverviewContainer = ({ allCollectionsLoaded }) => {
  const { loading, error } = useFetchAllCollections();

  if (loading && !error) {
    return <Spinner />;
  } else if (error) {
    return <ErrorMessage errorType='loading' />;
  } else if (!loading && allCollectionsLoaded) {
    return <CollectionsOverview />;
  } else {
    return <ErrorMessage errorType='noItemsFound' />;
  }
};

const mapStateToProps = createStructuredSelector({
  allCollectionsLoaded: selectAreAllCollectionsLoaded,
  collections: (state, ownProps) => selectCollections(state, ownProps),
});

export default connect(mapStateToProps)(CollectionsOverviewContainer);

CollectionsOverviewContainer.propTypes = {
  allCollectionsLoaded: PropTypes.bool.isRequired,
};
