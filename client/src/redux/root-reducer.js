import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
// actual local storage object on window object
import storage from "redux-persist/lib/storage";
import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import directoryReducer from "./directory/directory.reducer";
import shopReducer from "./shop/shop.reducer";

const persistConfig = {
  key: "root", // part of reducer object we want to start storage
  storage,
  whitelist: ["cart"] // reducers we want to persist
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer
});

// export modified version of rootReducer with persistance capabilities
export default persistReducer(persistConfig, rootReducer);
