// AuthContext.js
import { createContext, useContext, useState } from 'react';
import { useEffect } from 'react';
import eventEmitter from './EventEmitter';

const AuthContext = createContext();

var currentUser = null;

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)

  useEffect(() => {

    setIsAuthenticated(window.sessionStorage.getItem('isAuthenticated') ?? false);

    const handleEventLogin = (profile) => {
      login();
      setUser(profile);
    };
    const handleEventLogout = () => {
      logout();
    };

    eventEmitter.on('loggedIn', handleEventLogin);
    eventEmitter.on('loggedOut', handleEventLogout);

    return () => {
      // Clean up the event listener when the component unmounts
      eventEmitter.off('loggedIn', handleEventLogin);
      eventEmitter.off('loggedOut', handleEventLogout);
    };
  }, []);

  useEffect(() => {
    if(isAuthenticated !== null){
      window.sessionStorage.setItem('isAuthenticated', isAuthenticated);
    }
  }, [isAuthenticated]);

  const setUser = (profile) => {
    currentUser = profile;
  };

  const login = () => {
    setIsAuthenticated(true);
    window.location.href = '/';
  };

  const logout = () => {
    setIsAuthenticated(false);
    currentUser = null;
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const checkUser = () => {
  return window.sessionStorage.getItem('isAuthenticated') ?? false;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
