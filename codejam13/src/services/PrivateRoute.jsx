// PrivateRoute.jsx
import React, { useState } from 'react';
import { Route, Navigate, Outlet} from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { checkUser } from './AuthContext';


const PrivateRoute = () => {
    const { pathname } = useLocation();

    const [isValidToken, setIsValidToken] = useState(undefined);
  
    useEffect(() => {
      // initial mount or route changed, check token
      setIsValidToken(checkUser());
    }, [pathname]);
  
    if (isValidToken === undefined) {
      return null; // or loading indicator/spinner/etc
    }
  
    return isValidToken ? <Outlet/> : <Navigate to="/" replace />;
};

export default PrivateRoute;
