import CartActionTypes from "./cart.types";

export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN,
});

export const addItem = (item, quantity) => ({
  type: CartActionTypes.ADD_ITEM,
  payload: { item, quantity },
});

export const addItemWithOptions = (itemWithOptions) => ({
  type: CartActionTypes.ADD_ITEM_WITH_OPTIONS,
  payload: itemWithOptions,
});

export const clearItemFromCart = (item) => ({
  type: CartActionTypes.CLEAR_ITEM_FROM_CART,
  payload: item,
});

export const removeItem = (item) => ({
  type: CartActionTypes.REMOVE_ITEM,
  payload: item,
});

export const clearCart = () => ({
  type: CartActionTypes.CLEAR_CART,
});

export const updateCartInFirebase = () => ({
  type: CartActionTypes.UPDATE_CART_IN_FIREBASE,
});

export const fetchCartFromFirebase = () => ({
  type: CartActionTypes.FETCH_CART_FROM_FIREBASE,
});

export const setCartFromFirebase = (cartItems) => ({
  type: CartActionTypes.SET_CART_FROM_FIREBASE,
  payload: cartItems,
});
