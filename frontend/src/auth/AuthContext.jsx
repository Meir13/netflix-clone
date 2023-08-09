import { createContext, useEffect, useReducer } from "react";
import { authReducer } from "./authReducer";

const INITIAL_STATE = {
  //move local storage actions to other function in utility functions
  user:
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user"))
      : null,

  isLoading: false,

  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [loginState, dispatch] = useReducer(authReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(loginState.user));
  }, [loginState.user]);

  return (
    <AuthContext.Provider
      value={{
        user: loginState.user,
        isLoading: loginState.isLoading,
        error: loginState.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
