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
    // 1. get userReference from db or create one in db
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData
    );
    // 2. get user snapshot object, which can be used to get the user data
    const userSnapshot = yield userRef.get();

    // 3. dispatch signInSuccess action with user id. Also pass along rest of snapShot data (.data() method gives us actual properties on the snapshot object)
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
    // auth library returns an object that includes a user property which we can use to create userRef (userAuth object)
    // signInWithPopup (firebase) contains signIn options for several services (sign in with twitter, facebook etc). We just want google
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
    // create userAuth object with email and password
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    // if succeeds, dispatch signUpSuccess with userAuth and additionalData: {displayName: displayName} -> onSignUpSuccess saga listens for SIGN_UP_SUCCESS -> fires signInAfterSignUp saga -> yields getSnapshotFromUserAuth saga (creates user in db) -> dispatch signInSuccess action with user and update reducer
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

// listener effects listen for the SIGN_IN_START action, and then pass action obj into signIn saga
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

// instantiate all of the sagas we need to call (listen for)
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
