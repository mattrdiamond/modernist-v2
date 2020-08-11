import { createSelector } from "reselect";

const selectMobileNav = (state) => state.mobileNav;

export const selectMobileNavVisible = createSelector(
  [selectMobileNav],
  (mobileNav) => mobileNav.isVisible
);
