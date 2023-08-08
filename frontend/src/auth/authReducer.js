import { LOGOUT, SET_ERROR, SET_LOADING, SET_USER } from "./authActions";

export const authReducer = (loginState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { user: null, isLoading: true, error: false };

    case SET_USER:
      return { user: action.user, isLoading: false, error: false };

    case SET_ERROR:
      return { user: null, isLoading: false, error: true };

    case LOGOUT:
      localStorage.removeItem("user");
      return { user: null, isLoading: false, error: false };

    default:
      return { ...loginState };
  }
};
