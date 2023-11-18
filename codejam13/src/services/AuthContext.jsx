// AuthContext.js
import { createContext, useContext, useState } from 'react';
import { useEffect } from 'react';
import eventEmitter from './EventEmitter';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  var currentUser = {};

  useEffect(() => {
    const handleEvent = (profile) => {
      login();
      setUser(profile);
    };

    eventEmitter.on('loggedIn', handleEvent);

    return () => {
      // Clean up the event listener when the component unmounts
      eventEmitter.off('loggedIn', handleEvent);
    };
  }, []);

  useEffect(() => {
    // dont know what i am doing
  }, [isAuthenticated]);

  const setUser = (profile) => {
    currentUser = profile;
  };

  const login = () => {
    setIsAuthenticated(true);

  };

  const logout = () => {
    setIsAuthenticated(false);
    //window.location.href = '/login';
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
