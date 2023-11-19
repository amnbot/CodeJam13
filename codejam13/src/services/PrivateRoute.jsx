import React, { useState, useEffect } from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { checkUser } from "./AuthContext";

const PrivateRoute = () => {
  const { pathname } = useLocation();
  const [isValidToken, setIsValidToken] = useState(undefined);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const isValid = await checkUser();
        setIsValidToken(isValid);
      } catch (error) {
        // Handle error if needed
        console.error("Error checking token:", error);
        setIsValidToken(false);
      }
    };

    console.log("Checking token...");

    checkToken();
  }, [pathname]);

  return isValidToken ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
