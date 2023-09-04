import { createContext, useEffect, useReducer } from "react";
import { authReducer } from "./authReducer";

const INITIAL_STATE = {
  //move local storage actions to other function in utility functions
  user:
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  userFavorites:
    localStorage.getItem("userFavorites") !== null
      ? JSON.parse(localStorage.getItem("userFavorites"))
      : null,

  isLoading: false,

  error: "",
};

export const AuthContext = createContext(INITIAL_STATE);

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [loginState, dispatch] = useReducer(authReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(loginState.user));
    localStorage.setItem(
      "userFavorites",
      JSON.stringify(loginState.userFavorites)
    );
  }, [loginState.user, loginState.userFavorites]);

  return (
    <AuthContext.Provider
      value={{
        user: loginState.user,
        isLoading: loginState.isLoading,
        error: loginState.error,
        userFavorites: loginState.userFavorites,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
