// AuthContext.js
import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import eventEmitter from "./EventEmitter";
import { getUserIdByEmail, getUser } from "../utils/firestoreFunctions";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setIsAuthenticated(
      window.sessionStorage.getItem("isAuthenticated") ?? false
    );
    setUser(window.sessionStorage.getItem("currentUser") ?? null);

    const handleEventLogin = async (profile) => {
      login();
      await getUserIdByEmail(profile.email).then((id) => {
        console.log(id);
        setUser(id);
      });
    };
    const handleEventLogout = () => {
      logout();
    };

    eventEmitter.on("loggedIn", handleEventLogin);
    eventEmitter.on("loggedOut", handleEventLogout);

    return () => {
      // Clean up the event listener when the component unmounts
      eventEmitter.off("loggedIn", handleEventLogin);
      eventEmitter.off("loggedOut", handleEventLogout);
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated !== null) {
      window.sessionStorage.setItem("isAuthenticated", isAuthenticated);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (user !== null) {
      window.sessionStorage.setItem("currentUser", user);
    }
    console.log(user);
  }, [user]);

  const login = () => {
    console.log("Login");
    setIsAuthenticated(true);
    //window.location.href = "/";
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const getCurrentUser = async () => {
  const id = window.sessionStorage.getItem("currentUser");
  if (id !== null) {
    return await getUser(id);
  }
  return null;
};

export const checkUser = () => {
  return window.sessionStorage.getItem("isAuthenticated") ?? false;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
