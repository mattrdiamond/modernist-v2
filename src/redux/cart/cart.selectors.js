// Reselect provides a function createSelector for creating memoized selectors.
// If the Redux state tree is changed in a way that causes the value of an input-selector
// to change, the selector will call its transform function with the values of the
// input-selectors as arguments and return the result.
import { createSelector } from "reselect";

// input selector - returns portion of state
const selectCart = state => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems
);

// Reduce cart items into single value to get total item quantity
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    )
);
