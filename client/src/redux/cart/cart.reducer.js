import CartActionTypes from "./cart.types";
import {
  addItemToCart,
  addItemWithOptionsToCart,
  removeItemFromCart,
  clearItemFromCart,
} from "./cart.utils";

const INITIAL_STATE = {
  hidden: true,
  cartItems: [],
  isFetching: false,
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
      };
    case CartActionTypes.ADD_ITEM:
      const { item, quantity } = action.payload;
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, item, quantity),
      };
    case CartActionTypes.ADD_ITEM_WITH_OPTIONS:
      return {
        ...state,
        cartItems: addItemWithOptionsToCart(state.cartItems, action.payload),
      };
    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload),
      };
    case CartActionTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: clearItemFromCart(state.cartItems, action.payload),
      };
    case CartActionTypes.CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };
    case CartActionTypes.FETCH_CART_FROM_FIREBASE:
      return {
        ...state,
        isFetching: true,
      };
    case CartActionTypes.SET_CART_FROM_FIREBASE:
      return {
        ...state,
        cartItems: action.payload,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default cartReducer;
