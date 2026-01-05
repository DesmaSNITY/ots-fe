import React from 'react';
import { LogOut, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DashboardHeader({ token, setToken }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken('');
    navigate('/');
  };

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Left side - Brand */}
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent" 
                  style={{ fontFamily: "'Outfit', sans-serif" }}>
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-500">Manage questions, submissions, and grading</p>
            </div>
          </div>

          {/* Right side - Actions */}
          {token && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl
                       hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg shadow-red-500/30 
                       hover:shadow-red-500/50 hover:scale-[1.02] active:scale-[0.98] font-medium"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');
      `}</style>
    </div>
  );
}