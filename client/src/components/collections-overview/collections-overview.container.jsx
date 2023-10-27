import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCollections,
  selectAreAllCollectionsLoaded,
} from "../../redux/shop/shop.selectors";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
import CollectionsOverview from "./collections-overview.component";
import Spinner from "../../components/spinner/spinner.component";

const CollectionsOverviewContainer = ({
  fetchCollectionsStart,
  allCollectionsLoaded,
}) => {
  useEffect(() => {
    if (!allCollectionsLoaded) {
      fetchCollectionsStart();
    }
  }, [fetchCollectionsStart, allCollectionsLoaded]);

  return !allCollectionsLoaded ? <Spinner /> : <CollectionsOverview />;
};

const mapStateToProps = createStructuredSelector({
  allCollectionsLoaded: selectAreAllCollectionsLoaded,
  collections: (state, ownProps) => selectCollections(state, ownProps),
});

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionsOverviewContainer);

CollectionsOverviewContainer.propTypes = {
  fetchCollectionsStart: PropTypes.func.isRequired,
  allCollectionsLoaded: PropTypes.bool.isRequired,
};
