// src/context/AuthContext.js
import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check for token in localStorage when app starts
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken_(storedToken);
      axios.defaults.headers.common["Authorization"] = "Bearer " + storedToken;
    }
    setIsReady(true);
  }, []);

  const setToken = (newToken) => {
    setToken_(newToken);
    if (newToken) {
      localStorage.setItem("token", newToken);
      axios.defaults.headers.common["Authorization"] = "Bearer " + newToken;
    } else {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  const contextValue = useMemo(() => ({ token, setToken, isReady }), [token, isReady]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
