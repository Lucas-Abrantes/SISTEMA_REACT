import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, roles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  if (!auth.token) {
    // Not logged in, redirect to login page
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (roles && !roles.includes(auth.user.role)) {
    // Role not authorized, redirect to unauthorized page
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
