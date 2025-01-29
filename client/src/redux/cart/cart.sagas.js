import { all, call, takeLatest, put, select } from "redux-saga/effects";
import CartActionTypes from "./cart.types";
import UserActionTypes from "../user/user.types";
import CheckoutActionTypes from "../checkout/checkout.types";
import { getUserCartRef } from "../../firebase/firebase.utils";
import { getDoc, updateDoc } from "firebase/firestore";
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
  try {
    const cartRef = yield call(getUserCartRef, user.id);
    const cartSnapshot = yield call(getDoc, cartRef);

    const firebaseCartItems = cartSnapshot.data()?.cartItems || [];
    const localCartItems = yield select(selectCartItems);
    let finalCartItems = firebaseCartItems;

    if (firebaseCartItems.length === 0 && localCartItems.length > 0) {
      // Use local cart items if Firebase cart is empty and local cart has items
      finalCartItems = localCartItems;
      yield call(updateDoc, cartRef, { cartItems: localCartItems });
    }

    yield put(setCartFromFirebase(finalCartItems));
  } catch (error) {
    console.error("Error fetching cart items:", error);
  }
}

export function* updateCartItemsInFirebase() {
  const currentUser = yield select(selectCurrentUser);
  if (currentUser) {
    try {
      // Get reference to cart in Firestore
      const cartRef = yield call(getUserCartRef, currentUser.id);

      // Select cart items from the state
      const cartItems = yield select(selectCartItems);

      // Update cart items in Firestore
      yield call(updateDoc, cartRef, { cartItems });
    } catch (error) {
      console.error("Error updating cart items:", error);
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
      CartActionTypes.ADD_ITEM_TO_CART,
      CartActionTypes.REMOVE_ITEM_FROM_CART,
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
