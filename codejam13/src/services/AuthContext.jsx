// AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  

  const login = () => {
    // Perform authentication logic (e.g., API call, setting tokens)
    console.log("logged in");
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Perform logout logic (e.g., clear tokens)S
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
