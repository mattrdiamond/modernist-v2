import MobileNavActionTypes from "./mobile-nav.types";
import MobileNav from "../../components/mobile-nav/mobile-nav.component";

// export const toggleNavVisible = () => ({
//   type: MobileNavActionTypes.TOGGLE_NAV_VISIBLE,
// });

export const openNav = () => ({
  type: MobileNavActionTypes.OPEN_NAV,
});

export const closeNavStart = () => ({
  type: MobileNavActionTypes.CLOSE_NAV_START,
});

export const closeNavSuccess = () => ({
  type: MobileNavActionTypes.CLOSE_NAV_SUCCESS,
});
