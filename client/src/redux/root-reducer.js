import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
// Actual local storage object on window object
import storage from "redux-persist/lib/storage";
import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import directoryReducer from "./directory/directory.reducer";
import shopReducer from "./shop/shop.reducer";
import modalReducer from "./modal/modal.reducer";
import searchReducer from "./search/search.reducer";
import promoReducer from "./promo/promo.reducer";
import mobileNavReducer from "./mobile-nav/mobile-nav.reducer";
import checkoutReducer from "./checkout/checkout.reducer";
import reviewsReducer from "./reviews/reviews.reducer";

const persistConfig = {
  key: "root", // part of reducer object we want to start storage
  storage,
  whitelist: ["cart"], // reducers we want to persist
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer,
  modal: modalReducer,
  search: searchReducer,
  promo: promoReducer,
  mobileNav: mobileNavReducer,
  checkout: checkoutReducer,
  reviews: reviewsReducer,
});

export default persistReducer(persistConfig, rootReducer);
