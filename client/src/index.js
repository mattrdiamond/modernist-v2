import React from "react";
import ReactDOM from "react-dom";
import ScrollToTop from "./components/scroll-to-top/scroll-to-top.component";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import "./index.css";
import "./assets/fonts/fonts.css";
import App from "./App";

// Provider - provides access to redux store to rest of app
// PersistGate - delays rendering of app UI until peristed state has been retrieved and saved to redux - executes and "rehydrates" state when page refreshed

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <ScrollToTop />
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
