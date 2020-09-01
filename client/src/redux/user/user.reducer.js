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
      return {
        ...state,
        isFetching: true,
      };
    case UserActionTypes.SIGN_IN_SUCCESS:
      const { id, displayName, email, createdAt, favorites } = action.payload;
      console.log("success", action.payload);
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
    default:
      return state;
  }
};

export default userReducer;
