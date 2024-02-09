import { createSelector } from "reselect";
import { selectAppliedPromos, selectPromoData } from "../promo/promo.selectors";
import {
  taxRate,
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

export const selectTotalDiscount = createSelector(
  [selectCartSubtotal, selectAppliedPromos, selectPromoData],
  (cartSubtotal, appliedPromos, promoData) => {
    let totalDiscount = 0;
    appliedPromos.forEach((code) => {
      const promoInfo = promoData && promoData[code];
      if (promoInfo && promoInfo.discountType === "percentage") {
        const discountAmount = (promoInfo.discount / 100) * cartSubtotal;
        totalDiscount += discountAmount;
      } else if (promoInfo && promoInfo.discountType === "fixed") {
        totalDiscount += promoInfo.discount;
      }
    });
    return totalDiscount;
  }
);

export const getTotal = createSelector(
  [selectCartSubtotal, selectTotalDiscount, getTax, getShipping],
  (cartSubtotal, totalDiscount, tax, shipping) => {
    return cartSubtotal - totalDiscount + tax + shipping;
  }
);

export const selectCartItemsWithDiscounts = createSelector(
  [selectCartItems, selectAppliedPromos, selectPromoData],
  (cartItems, appliedPromos, promoData) => {
    return cartItems.map((item) => {
      // Calculate total price without discounts
      let totalPrice = item.price * item.quantity;

      // Check if there are applied promos for this item
      const itemAppliedPromos = appliedPromos.filter((code) =>
        promoData.hasOwnProperty(code)
      );

      // Apply discounts based on promoData
      itemAppliedPromos.forEach((code) => {
        const promo = promoData[code];
        if (promo.discountType === "percentage") {
          totalPrice -= (promo.discount / 100) * totalPrice;
        } else if (promo.discountType === "fixed") {
          totalPrice -= promo.discount;
        }
      });

      return {
        ...item,
        discountedPrice: totalPrice,
        discountApplied:
          totalPrice !== undefined && totalPrice / item.quantity < item.price,
      };
    });
  }
);
