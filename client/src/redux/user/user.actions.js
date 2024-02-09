import UserActionTypes from "./user.types";

export const googleSignInStart = () => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_START,
});

export const emailSignInStart = (emailAndPassword) => ({
  type: UserActionTypes.EMAIL_SIGN_IN_START,
  payload: emailAndPassword,
});

export const signInSuccess = (user) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const signInFailure = (error) => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error,
});

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION,
});

export const checkUserSessionNoUser = () => ({
  type: UserActionTypes.CHECK_USER_SESSION_NO_USER,
});

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = (error) => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: error,
});

export const signUpStart = (userCredentials) => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: userCredentials,
});

export const signUpSuccess = ({ user, additionalData }) => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: { user, additionalData },
});

export const signUpFailure = (error) => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: error,
});

export const addFavoriteStart = ({ currentUser, item, favorites }) => ({
  type: UserActionTypes.ADD_FAVORITE_START,
  payload: { currentUser, item, favorites },
});

export const addFavoriteSuccess = (item) => ({
  type: UserActionTypes.ADD_FAVORITE_SUCCESS,
  payload: item,
});

export const addFavoriteFailure = (error) => ({
  type: UserActionTypes.ADD_FAVORITE_FAILURE,
  payload: error,
});

export const removeFavoriteStart = ({ currentUser, item, favorites }) => ({
  type: UserActionTypes.REMOVE_FAVORITE_START,
  payload: { currentUser, item, favorites },
});

export const removeFavoriteSuccess = (item) => ({
  type: UserActionTypes.REMOVE_FAVORITE_SUCCESS,
  payload: item,
});

export const removeFavoriteFailure = (error) => ({
  type: UserActionTypes.REMOVE_FAVORITE_FAILURE,
  payload: error,
});

export const clearError = () => ({
  type: UserActionTypes.CLEAR_ERROR,
});

export const setError = (error) => ({
  type: UserActionTypes.SET_ERROR,
  payload: error,
});
