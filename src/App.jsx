import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashBoard from "./pages/DashBoardPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Protected Route - requires authentication */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashBoard />
          </ProtectedRoute>
        } 
      />
      
      {/* Redirect any unknown routes to login */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;