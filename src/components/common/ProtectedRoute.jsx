import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { currentUser } = useAuth();
  const location = useLocation();


  if (!currentUser) {
    // Redirect to login page and store source URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Verification checks for role
  if (allowedRoles.length > 0 && !allowedRoles.includes(currentUser.role)) {
    // If authenticated but unauthorized role, send to home page or specific dashboard
    if (currentUser.role === 'farmer') {
      return <Navigate to="/farmer" replace />;
    } else if (currentUser.role === 'admin') {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  // Farmer KYC check (must complete KYC before accessing farmer operations)
  if (currentUser.role === 'farmer' && currentUser.status === 'pending_kyc' && location.pathname !== '/farmer/kyc') {
    return <Navigate to="/farmer/kyc" replace />;
  }

  return children;
};

export default ProtectedRoute;
