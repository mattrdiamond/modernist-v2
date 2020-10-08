import { all, call, takeLatest, put, select } from "redux-saga/effects";
import CartActionTypes from "./cart.types";
import UserActionTypes from "../user/user.types";
import CheckoutActionTypes from "../checkout/checkout.types";
import { getUserCartRef } from "../../firebase/firebase.utils";
import { selectCurrentUser } from "../user/user.selectors";
import { selectCartItems } from "./cart.selectors";
import {
  clearCart,
  fetchCartFromFirebase,
  setCartFromFirebase,
} from "./cart.actions";

export function* handleClearCart() {
  yield put(clearCart());
}

export function* getCartItemsFromFirebase({ payload: user }) {
  // Get reference to cart in db
  const cartRef = yield getUserCartRef(user.id);
  const cartSnapshot = yield cartRef.get();
  console.log("update state with firebase state");
  // Get data from snapshot object and update state
  yield put(setCartFromFirebase(cartSnapshot.data().cartItems));
}

export function* updateCartItemsInFirebase() {
  const currentUser = yield select(selectCurrentUser);
  if (currentUser) {
    try {
      // Get reference to cart in db
      const cartRef = yield getUserCartRef(currentUser.id);
      // Select cart items in state
      const cartItems = yield select(selectCartItems);
      // Update cart items in db
      yield cartRef.update({ cartItems });
    } catch (error) {
      console.log(error);
    }
  }
}

export function* fetchCartItemsStart() {
  // Set isFetching to true
  yield put(fetchCartFromFirebase());
}

export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, handleClearCart);
}

export function* onPaymentComplete() {
  yield takeLatest(CheckoutActionTypes.PAYMENT_SUCCESS, handleClearCart);
}

export function* onSignInStart() {
  yield takeLatest(
    [UserActionTypes.EMAIL_SIGN_IN_START, UserActionTypes.GOOGLE_SIGN_IN_START],
    fetchCartItemsStart
  );
}

export function* onUserSignIn() {
  yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, getCartItemsFromFirebase);
}

export function* onCartChange() {
  yield takeLatest(
    [
      CartActionTypes.ADD_ITEM,
      CartActionTypes.REMOVE_ITEM,
      CartActionTypes.CLEAR_ITEM_FROM_CART,
      CartActionTypes.CLEAR_CART,
    ],
    updateCartItemsInFirebase
  );
}

export function* cartSagas() {
  yield all([
    call(onSignOutSuccess),
    call(onSignInStart),
    call(onUserSignIn),
    call(onCartChange),
    call(onPaymentComplete),
  ]);
}
