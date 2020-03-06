import React from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    // onAuthStateChanged is open subscription between app and firebase which lets us know
    //  when authentication state has changed without having to fetch manually.
    //  auth.onAuthStateChanged returns a function which when executed will close script subscription.
    //  @param userAuth: user authenticated object from Auth library, which persists when refreshing page.
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        // get userReference from db or create one
        const userRef = createUserProfileDocument(userAuth);

        // onSnapshot() subscribes to userRef and listens for any changes. Also returns initial state.
        // snapShot.data() method gives us actual properties on the snapshot object (aka data)
        (await userRef).onSnapshot(snapShot => {
          setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });
      }
      // If user signs out, set currentUser to null
      else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    // Close subscription to firebase to prevent memory leaks from open connection.
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          {/* If user signed in, redirect user to home page when clicking signin.
            also redirects to home when user signs in.
          render prop determines what component to return*/}
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  // component > dispatch(action(value)) > reducer > root-reducer(store)
  // setCurrentUser(user) returns the object from user action which includes action type and payload
  // that action is then dispatched to user reducer and then to root-reducer
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
