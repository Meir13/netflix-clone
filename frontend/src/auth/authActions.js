export const SET_LOADING = "LOGIN_START";
export const SET_USER = "LOGIN_SUCCESS";
export const SET_ERROR = "GET_FAILURE";
export const LOGOUT = "LOGOUT";

export const setLoading = () => ({ type: SET_LOADING });
export const setUser = (user) => ({ type: SET_USER, user: user });
export const setError = () => ({ type: SET_ERROR });
export const signOut = () => ({ type: LOGOUT });
