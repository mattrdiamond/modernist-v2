import CartActionTypes from "./cart.types";

export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN,
});

export const addItemToCart = (item, quantity) => ({
  type: CartActionTypes.ADD_ITEM_TO_CART,
  payload: { item, quantity },
});

export const clearItemFromCart = (item) => ({
  type: CartActionTypes.CLEAR_ITEM_FROM_CART,
  payload: item,
});

export const removeItemFromCart = (cartItem, quantityToRemove = 1) => ({
  type: CartActionTypes.REMOVE_ITEM_FROM_CART,
  payload: { cartItem, quantityToRemove },
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
