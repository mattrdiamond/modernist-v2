import { takeLatest, call, put, all, delay } from "redux-saga/effects";
import MobileNavActionTypes from "./mobile-nav.types";
import { closeNavSuccess } from "./mobile-nav.actions";

export function* closeNav() {
  // set delay to allow 0.3s animation to complete
  yield delay(333.33);
  yield put(closeNavSuccess());
}

// listen for toggle nav start action
export function* onCloseNavStart() {
  yield takeLatest(MobileNavActionTypes.CLOSE_NAV_START, closeNav);
}

export function* mobileNavSagas() {
  yield all([call(onCloseNavStart)]);
}
