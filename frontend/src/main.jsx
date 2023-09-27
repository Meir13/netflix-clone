import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { HelmetProvider } from "react-helmet-async";
import axios from "axios";
import { AuthContextProvider } from "./auth/AuthContext.jsx";

axios.defaults.baseURL = import.meta.env.VITE_API_ROUTE //remove s
  ? import.meta.env.VITE_API_ROUTE
  : "http://localhost:5001/api";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
