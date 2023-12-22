import { createSelector } from "reselect";
import { selectPromoApplied } from "../promo/promo.selectors";
import {
  taxRate,
  promoPercentage,
  shippingThreshold,
  shippingCostPerItem,
} from "../../utils/constants";

const selectCart = (state) => state.cart;

export const selectCartFetching = createSelector(
  [selectCart],
  (cart) => cart.isFetching
);

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

// Reduce cart items into total item quantity
export const getTotalQuantity = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity,
    0
  )
);

export const selectCartSubtotal = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity * cartItem.price,
      0
    )
);

export const getShipping = createSelector(
  [selectCartSubtotal, getTotalQuantity],
  (cartSubtotal, totalQuantity) => {
    return cartSubtotal >= shippingThreshold
      ? 0
      : shippingCostPerItem * totalQuantity;
  }
);

export const getTax = createSelector([selectCartSubtotal], (cartSubtotal) => {
  return cartSubtotal * taxRate;
});

export const getDiscount = createSelector(
  [selectCartSubtotal, selectPromoApplied],
  (cartSubtotal, promoApplied) => {
    return promoApplied ? cartSubtotal * promoPercentage : 0;
  }
);

export const getTotal = createSelector(
  [selectCartSubtotal, getDiscount, getTax, getShipping],
  (cartSubtotal, discount, tax, shipping) => {
    return cartSubtotal - discount + tax + shipping;
  }
);
