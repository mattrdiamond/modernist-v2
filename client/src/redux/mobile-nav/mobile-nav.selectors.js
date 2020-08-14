import { createSelector } from "reselect";

const selectMobileNav = (state) => state.mobileNav;

export const selectNavVisible = createSelector(
  [selectMobileNav],
  (mobileNav) => mobileNav.isVisible
);
