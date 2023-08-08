import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { HelmetProvider } from "react-helmet-async";
import axios from "axios";
import { AuthContextProvider } from "./auth/authContext.jsx";

axios.defaults.baseURL = "http://localhost:5001/api";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <React.StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </React.StrictMode>
  </AuthContextProvider>
);
