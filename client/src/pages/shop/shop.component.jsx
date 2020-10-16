import React, { useEffect, lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../../components/spinner/spinner.component";
import ErrorBoundary from "../../components/error-boundary/error-boundary.component";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";

const CollectionsOverviewContainer = lazy(() =>
  import("../../components/collections-overview/collections-overview.container")
);
const CollectionPageContainer = lazy(() =>
  import("../collection/collection.container")
);
const ProductPageContainer = lazy(() =>
  import("../product-page/product-page.container")
);

const ShopPage = ({ fetchCollectionsStart, match }) => {
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart]);

  return (
    <section className="shop-page">
      <Suspense fallback={<Spinner />}>
        <Route
          exact
          path={`${match.path}`}
          render={() => (
            <ErrorBoundary>
              <CollectionsOverviewContainer />
            </ErrorBoundary>
          )}
        />
        <Route
          exact
          path={`${match.path}/:collectionId`}
          render={() => (
            <ErrorBoundary>
              <CollectionPageContainer />
            </ErrorBoundary>
          )}
        />
        <Route
          path={`${match.path}/:collectionId/:itemId`}
          render={(props) => (
            <ErrorBoundary>
              <ProductPageContainer {...props} />
            </ErrorBoundary>
          )}
        />
      </Suspense>
    </section>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
