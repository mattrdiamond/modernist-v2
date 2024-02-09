import CartActionTypes from "./cart.types";
import { addItemToCart, removeCartItem, clearItemFromCart } from "./cart.utils";

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
    case CartActionTypes.ADD_ITEM_TO_CART:
      return {
        ...state,
        cartItems: addItemToCart(
          state.cartItems,
          action.payload.item,
          action.payload.quantity
        ),
      };
    case CartActionTypes.REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: removeCartItem(
          state.cartItems,
          action.payload.cartItem,
          action.payload.quantityToRemove
        ),
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
