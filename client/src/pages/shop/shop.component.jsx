import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionPageContainer from "../collection/collection.container";
import ProductPageContainer from "../product-page/product-page.container";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
import "./shop.styles.scss";

const ShopPage = ({ fetchCollectionsStart, match }) => {
  // will only re-render if fetchCollectionsStart changes
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart]);

  return (
    <section className="shop-page">
      {/* in this case, match.path will be /shop */}
      <Route
        exact
        path={`${match.path}`}
        component={CollectionsOverviewContainer}
      />
      <Route
        exact
        path={`${match.path}/:collectionId`}
        component={CollectionPageContainer}
      />
      <Route
        path={`${match.path}/:collectionId/:itemId`}
        component={ProductPageContainer}
      />
    </section>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
