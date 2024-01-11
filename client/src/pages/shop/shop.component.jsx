import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Spinner from "../../components/spinner/spinner.component";
import ErrorBoundary from "../../components/error-boundary/error-boundary.component";

const CollectionsOverviewContainer = lazy(() =>
  import("../collections-overview/collections-overview.container")
);
const CollectionPageContainer = lazy(() =>
  import("../collection/collection.container")
);
const ProductPageContainer = lazy(() =>
  import("../product-page/product-page.container")
);
const BestsellersPageContainer = lazy(() =>
  import("../bestsellers/bestsellers.container")
);
const TopRatedPageContainer = lazy(() =>
  import("../top-rated/top-rated-page.container")
);
const NewArrivalsPageContainer = lazy(() =>
  import("../new-arrivals/new-arrivals-page.container")
);

const ShopPage = ({ match }) => {
  return (
    <section className='shop-page'>
      <Suspense fallback={<Spinner />}>
        <Switch>
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
            path={`${match.path}/bestsellers`}
            render={(props) => (
              <ErrorBoundary>
                <BestsellersPageContainer {...props} />
              </ErrorBoundary>
            )}
          />
          <Route
            exact
            path={`${match.path}/top-rated`}
            render={(props) => (
              <ErrorBoundary>
                <TopRatedPageContainer {...props} />
              </ErrorBoundary>
            )}
          />
          <Route
            exact
            path={`${match.path}/new-arrivals`}
            render={(props) => (
              <ErrorBoundary>
                <NewArrivalsPageContainer {...props} />
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
        </Switch>
      </Suspense>
    </section>
  );
};

export default ShopPage;
