import React from 'react';

export default function DashboardHeader({ token, setToken }) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Manage questions, answers, and user grading</p>
          </div>
          <div className="flex items-center gap-2">
            {/* <input
              type="password"
              placeholder="Bearer Token"
              value={token}
              onChange={(e) => {
                setToken(e.target.value);
                localStorage.setItem('adminToken', e.target.value);
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}