import UserActionTypes from "./user.types.js";

const INITIAL_STATE = {
  currentUser: null,
  favorites: null,
  isFetching: false,
  error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.CHECK_USER_SESSION:
    case UserActionTypes.EMAIL_SIGN_IN_START:
    case UserActionTypes.GOOGLE_SIGN_IN_START:
      return {
        ...state,
        isFetching: true,
      };
    case UserActionTypes.CHECK_USER_SESSION_NO_USER:
      return {
        ...state,
        isFetching: false,
      };
    case UserActionTypes.SIGN_IN_SUCCESS:
      const { id, displayName, email, createdAt, favorites } = action.payload;
      return {
        ...state,
        currentUser: { id, displayName, email, createdAt },
        favorites: favorites,
        isFetching: false,
        error: null,
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        favorites: null,
        error: null,
      };
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
    case UserActionTypes.ADD_FAVORITE_FAILURE:
    case UserActionTypes.REMOVE_FAVORITE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case UserActionTypes.ADD_FAVORITE_SUCCESS:
      return {
        ...state,
        favorites: { ...state.favorites, [action.payload.id]: action.payload },
      };
    case UserActionTypes.REMOVE_FAVORITE_SUCCESS:
      return {
        ...state,
        favorites: action.payload,
      };
    case UserActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case UserActionTypes.SET_ERROR:
      return {
        ...state,
        error: { message: action.payload },
      };
    default:
      return state;
  }
};

export default userReducer;
