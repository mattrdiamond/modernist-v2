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
} from "./user.actions";

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    // 1. Get userReference from db or create one in db
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData
    );
    // 2. Get user snapshot object, which can be used to get the user data
    const userSnapshot = yield userRef.get();

    // 3. Dispatch signInSuccess action with user id and snapShot data (.data() method gives us actual properties on the snapshot object)
    yield put(
      signInSuccess({
        id: userSnapshot.id,
        ...userSnapshot.data(),
      })
    );
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithGoogle() {
  try {
    // Auth library returns an object that includes a user property which we can use to create userRef (userAuth object)
    // signInWithPopup prompts user to sign in with Google
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(signUpSuccess({ user, additionalData: { displayName } }));
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
  yield getSnapshotFromUserAuth(user, additionalData);
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
