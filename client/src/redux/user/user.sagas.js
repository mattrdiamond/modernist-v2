import { takeLatest, put, all, call } from "redux-saga/effects";
import UserActionTypes from "./user.types";
import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
  addItemToFavorites,
  removeItemFromFavorites,
} from "../../firebase/firebase.utils";
import {
  signInSuccess,
  signInFailure,
  signOutFailure,
  signOutSuccess,
  signUpSuccess,
  signUpFailure,
  addFavoriteSuccess,
  addFavoriteFailure,
  removeFavoriteSuccess,
  removeFavoriteFailure,
  checkUserSessionNoUser,
} from "./user.actions";
import { getDoc } from "firebase/firestore";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    // 1. Get userReference from db or create one in db
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData
    );
    // 2. Get the user document snapshot, which contains the user data
    const userDocSnapshot = yield call(getDoc, userRef);

    // 3. Dispatch signInSuccess action with user id and snapShot data (.data() method gives us actual properties on the snapshot object)
    yield put(
      signInSuccess({
        id: userDocSnapshot.id,
        ...userDocSnapshot.data(),
      })
    );
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithPopup, auth, googleProvider);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield call(
      signInWithEmailAndPassword,
      auth,
      email,
      password
    );
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);

    if (!userAuth) {
      yield put(checkUserSessionNoUser());
    } else {
      yield call(getSnapshotFromUserAuth, userAuth);
    }
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signOut() {
  try {
    yield call(() => auth.signOut());
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(
      createUserWithEmailAndPassword,
      auth,
      email,
      password
    );
    yield put(signUpSuccess({ user, additionalData: { displayName } }));
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
  yield call(getSnapshotFromUserAuth, user, additionalData);
}

export function* addFavorite({ payload: { currentUser, item, favorites } }) {
  try {
    yield call(addItemToFavorites, currentUser, item, favorites);
    yield put(addFavoriteSuccess(item));
  } catch (error) {
    yield put(addFavoriteFailure(error));
  }
}

export function* removeFavorite({ payload: { currentUser, item, favorites } }) {
  try {
    const newFavorites = yield call(
      removeItemFromFavorites,
      currentUser,
      item,
      favorites
    );
    yield put(removeFavoriteSuccess(newFavorites));
  } catch (error) {
    yield put(removeFavoriteFailure(error));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* addFavoriteStart() {
  yield takeLatest(UserActionTypes.ADD_FAVORITE_START, addFavorite);
}

export function* removeFavoriteStart() {
  yield takeLatest(UserActionTypes.REMOVE_FAVORITE_START, removeFavorite);
}

// Instantiate all of the sagas to listen for
export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(isUserAuthenticated),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(addFavoriteStart),
    call(removeFavoriteStart),
  ]);
}
