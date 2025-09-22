import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
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
const ShopTheLookPage = lazy(() =>
  import("../shop-the-look/shop-the-look.component")
);

const ShopPage = () => {
  return (
    <section className='shop-page'>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route
            index
            element={
              <ErrorBoundary>
                <CollectionsOverviewContainer />
              </ErrorBoundary>
            }
          />
          <Route
            path='bestsellers'
            element={
              <ErrorBoundary>
                <BestsellersPageContainer />
              </ErrorBoundary>
            }
          />
          <Route
            path='top-rated'
            element={
              <ErrorBoundary>
                <TopRatedPageContainer />
              </ErrorBoundary>
            }
          />
          <Route
            path='new-arrivals'
            element={
              <ErrorBoundary>
                <NewArrivalsPageContainer />
              </ErrorBoundary>
            }
          />
          <Route
            path='shop-the-look'
            element={
              <ErrorBoundary>
                <ShopTheLookPage />
              </ErrorBoundary>
            }
          />
          <Route
            path=':collectionId'
            element={
              <ErrorBoundary>
                <CollectionPageContainer />
              </ErrorBoundary>
            }
          />
          <Route
            path=':collectionId/:itemId'
            element={
              <ErrorBoundary>
                <ProductPageContainer />
              </ErrorBoundary>
            }
          />
        </Routes>
      </Suspense>
    </section>
  );
};

export default ShopPage;
