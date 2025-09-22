import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Header from "./components/header/header.component";
import Portal from "./components/portal/portal.component";
import ModalManager from "./components/modals/modal-manager";
import Footer from "./components/footer/footer.component";
import Spinner from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";

import { createStructuredSelector } from "reselect";
import { selectInputHidden } from "./redux/search/search.selectors";
import { selectCartHidden } from "./redux/cart/cart.selectors";
import { selectDropdownHidden } from "./redux/shop/shop.selectors";
import { selectNavVisible } from "./redux/mobile-nav/mobile-nav.selectors";
import { selectCheckoutConfirmation } from "./redux/checkout/checkout.selectors";

import { checkUserSession } from "./redux/user/user.actions";

import "./sharedStyles/index.scss";

// lazy load JS for each route
const HomePage = lazy(() => import("./pages/homepage/homepage.component"));
const ShopPage = lazy(() => import("./pages/shop/shop.component"));
const CheckoutPage = lazy(() =>
  import("./pages/checkout/checkout-page.container")
);
const SearchPage = lazy(() =>
  import("./pages/search-page/search-page.component")
);
const SignInAndSignUpPage = lazy(() =>
  import("./pages/sign-in-and-sign-up/sign-in-and-sign-up.component")
);
const FavoritesPage = lazy(() =>
  import("./pages/favorites/favorites.component")
);
const Confirmation = lazy(() =>
  import("./pages/confirmation/confirmation.component")
);

const App = ({
  checkUserSession,
  inputHidden,
  cartHidden,
  shopDropdownHidden,
  checkoutComplete,
}) => {
  useEffect(() => {
    // check if user's authentication has persisted
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div
      id='app'
      className={
        !cartHidden
          ? "cart-visible"
          : !shopDropdownHidden || !inputHidden
          ? "dropdown-visible"
          : null
      }
    >
      <Header />
      <div className='content-window'>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route
              path='/'
              element={
                <ErrorBoundary>
                  <HomePage />
                </ErrorBoundary>
              }
            />
            <Route
              path='/shop/*'
              element={
                <ErrorBoundary>
                  <ShopPage />
                </ErrorBoundary>
              }
            />
            <Route
              path='/favorites'
              element={
                <ErrorBoundary>
                  <FavoritesPage />
                </ErrorBoundary>
              }
            />
            <Route
              path='/checkout'
              element={
                checkoutComplete ? (
                  <Navigate to='/confirmation' />
                ) : (
                  <ErrorBoundary>
                    <CheckoutPage />
                  </ErrorBoundary>
                )
              }
            />
            <Route
              path='/confirmation'
              element={
                !checkoutComplete ? (
                  <Navigate to='/' />
                ) : (
                  <ErrorBoundary>
                    <Confirmation />
                  </ErrorBoundary>
                )
              }
            />
            <Route
              path='/signin'
              element={
                <ErrorBoundary>
                  <SignInAndSignUpPage />
                </ErrorBoundary>
              }
            />
            <Route
              path='/search'
              element={
                <ErrorBoundary>
                  <SearchPage />
                </ErrorBoundary>
              }
            />
          </Routes>
        </Suspense>
      </div>
      <Footer />
      <Portal>
        <ModalManager />
      </Portal>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  inputHidden: selectInputHidden,
  cartHidden: selectCartHidden,
  shopDropdownHidden: selectDropdownHidden,
  mobileNavVisible: selectNavVisible,
  checkoutComplete: selectCheckoutConfirmation,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  checkUserSession: PropTypes.func.isRequired,
  inputHidden: PropTypes.bool.isRequired,
  cartHidden: PropTypes.bool.isRequired,
  shopDropdownHidden: PropTypes.bool.isRequired,
  checkoutComplete: PropTypes.bool.isRequired,
};
