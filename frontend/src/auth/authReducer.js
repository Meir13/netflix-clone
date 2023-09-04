import {
  LOGOUT,
  SET_ERROR,
  SET_LOADING,
  SET_USER,
  UPDATE_FAVORITES,
} from "./authActions";

export const authReducer = (loginState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...loginState, user: null, isLoading: true, error: "" };

    case SET_USER:
      return { ...loginState, user: action.user, isLoading: false, error: "" };

    case SET_ERROR:
      return {
        ...loginState,
        user: null,
        isLoading: false,
        error: action.error,
      };

    case LOGOUT:
      localStorage.removeItem("user");
      return { ...loginState, user: null, isLoading: false, error: "" };

    case UPDATE_FAVORITES:
      return { ...loginState, userFavorites: action.userFavorites };

    default:
      return { ...loginState };
  }
};
