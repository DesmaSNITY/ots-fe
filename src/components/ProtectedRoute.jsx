import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  // Check if token exists in localStorage
  const token = localStorage.getItem('adminToken');
  
  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/" replace />;
  }
  
  // If token exists, render the protected component
  return children;
}