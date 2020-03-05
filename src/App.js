import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
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
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
          console.log("state", this.state);
        });
      }
      // If user signs out, set currentUser to null
      else {
        this.setState({ currentUser: userAuth });
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
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUp} />
        </Switch>
      </div>
    );
  }
}

export default App;
