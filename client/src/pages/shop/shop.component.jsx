import React, { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import Spinner from "../../components/spinner/spinner.component";
import ErrorBoundary from "../../components/error-boundary/error-boundary.component";

const CollectionsOverviewContainer = lazy(() =>
  import("../../components/collections-overview/collections-overview.container")
);
const CollectionPageContainer = lazy(() =>
  import("../collection/collection.container")
);
const ProductPageContainer = lazy(() =>
  import("../product-page/product-page.container")
);

const ShopPage = ({ match }) => {
  return (
    <section className='shop-page'>
      <Suspense fallback={<Spinner />}>
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <ErrorBoundary>
              <CollectionsOverviewContainer {...props} />
            </ErrorBoundary>
          )}
        />
        <Route
          exact
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <ErrorBoundary>
              <CollectionPageContainer {...props} />
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

export default ShopPage;
