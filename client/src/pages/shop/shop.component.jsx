import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionPageContainer from "../collection/collection.container";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";

const ShopPage = ({ fetchCollectionsStart, match }) => {
  // will only re-render if fetchCollectionsStart changes
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart]);

  const modalRef = React.useRef();

  const openModal = () => {
    modalRef.current.openModal();
  };

  return (
    <div className="shop-page">
      {/* in this case, match.path will be /shop */}
      <Route
        exact
        path={`${match.path}`}
        component={CollectionsOverviewContainer}
      />
      <Route
        path={`${match.path}/:collectionId`}
        component={CollectionPageContainer}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
