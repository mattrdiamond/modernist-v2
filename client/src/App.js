import React, { useEffect } from "react";
import "./App.css";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import CheckoutPage from "./pages/checkout/checkout.component.jsx";
import SearchPage from "./pages/search-page/search-page.component.jsx";
import Header from "./components/header/header.component";
import { connect } from "react-redux";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { selectInputHidden } from "./redux/search/search.selectors";
import { checkUserSession } from "./redux/user/user.actions";
import { createStructuredSelector } from "reselect";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import FavoritesPage from "./pages/favorites/favorites.component";
import Confirmation from "./pages/confirmation/confirmation.component";
import Portal from "./components/portal/portal.component";
import ModalManager from "./components/modals/modal-manager";
import Footer from "./components/footer/footer.component";
import { selectCartHidden } from "./redux/cart/cart.selectors";
import { selectDropdownHidden } from "./redux/shop/shop.selectors";
import { selectNavVisible } from "./redux/mobile-nav/mobile-nav.selectors";

const App = ({
  checkUserSession,
  currentUser,
  inputHidden,
  cartHidden,
  shopDropdownHidden,
  mobileNavVisible,
  history,
}) => {
  // equivalent to componentDidMount (will only re-render if checkUserSession changes, and we know it will not)
  useEffect(() => {
    // check if user's authentication has persisted
    checkUserSession();
  }, [checkUserSession]);

  const getDropdownStatus = () => {
    switch (true) {
      case !cartHidden:
        return "cart-visible";
      case !shopDropdownHidden:
        return "shop-dropdown-visible";
      case !inputHidden:
        return "input-visible";
      case mobileNavVisible:
        return "nav-visible";
      default:
        return;
    }
  };

  console.log("render app", history);

  return (
    <div id="app" className={getDropdownStatus()}>
      <Header />
      <div className="content-window">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route exact path="/favorites" component={FavoritesPage} />
          <Route
            exact
            path="/confirmation"
            render={(data) =>
              !data.location.paymentData ? (
                <Redirect to="/" />
              ) : (
                <Confirmation />
              )
            }
          />
          {/* If user signed in, redirect to previous page when navigating to /signin.
              Also redirect to previous page after user signs in. Alternatively we could <Redirect to="/" /> */}
          <Route
            exact
            path="/signin"
            render={() =>
              currentUser ? history.goBack() : <SignInAndSignUpPage />
            }
          />
          <Route path="/search" component={SearchPage} />
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
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
