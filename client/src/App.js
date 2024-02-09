import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./components/header/header.component";
import Portal from "./components/portal/portal.component";
import ModalManager from "./components/modals/modal-manager";
import Footer from "./components/footer/footer.component";
import Spinner from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";

import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selectors";
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
  currentUser,
  inputHidden,
  cartHidden,
  shopDropdownHidden,
  history,
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
        <Switch>
          <Suspense fallback={<Spinner />}>
            <Route
              exact
              path='/'
              render={() => (
                <ErrorBoundary>
                  <HomePage />
                </ErrorBoundary>
              )}
            />
            <Route
              path='/shop'
              render={(props) => (
                <ErrorBoundary>
                  <ShopPage {...props} />
                </ErrorBoundary>
              )}
            />
            <Route
              exact
              path='/favorites'
              render={() => (
                <ErrorBoundary>
                  <FavoritesPage />
                </ErrorBoundary>
              )}
            />
            <Route
              exact
              path='/checkout'
              render={() =>
                checkoutComplete ? (
                  <Redirect to='/confirmation' />
                ) : (
                  <ErrorBoundary>
                    <CheckoutPage />
                  </ErrorBoundary>
                )
              }
            />
            <Route
              exact
              path='/confirmation'
              render={() =>
                !checkoutComplete ? (
                  <Redirect to='/' />
                ) : (
                  <ErrorBoundary>
                    <Confirmation />
                  </ErrorBoundary>
                )
              }
            />
            {/* If user signed in, redirect to previous page when navigating to /signin.
              Also redirect to previous page after user signs in. */}
            <Route
              exact
              path='/signin'
              render={() =>
                currentUser ? (
                  history.goBack()
                ) : (
                  <ErrorBoundary>
                    <SignInAndSignUpPage />
                  </ErrorBoundary>
                )
              }
            />
            <Route
              path='/search'
              render={(props) => (
                <ErrorBoundary>
                  <SearchPage {...props} />
                </ErrorBoundary>
              )}
            />
          </Suspense>
        </Switch>
      </div>
      <Footer />
      <Portal>
        <ModalManager />
      </Portal>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  inputHidden: selectInputHidden,
  cartHidden: selectCartHidden,
  shopDropdownHidden: selectDropdownHidden,
  mobileNavVisible: selectNavVisible,
  checkoutComplete: selectCheckoutConfirmation,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
