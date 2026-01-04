import React from 'react';

export default function UsersTab({ users, loading }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">User Management</h2>

      {loading ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500">Loading users...</p>
        </div>
      ) : users.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500">No users found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">NIM</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kelompok</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Submissions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Success Rate</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => {
                  const successRate = user.total_submissions > 0 
                    ? Math.round((user.successful_submissions / user.total_submissions) * 100)
                    : 0;

                  return (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{user.id}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{user.nim}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{user.kelompok}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{user.total_submissions}</td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                            <div 
                              className={`h-2 rounded-full ${
                                successRate >= 80 ? 'bg-green-500' :
                                successRate >= 60 ? 'bg-yellow-500' :
                                'bg-red-500'
                              }`}
                              style={{ width: `${successRate}%` }}
                            />
                          </div>
                          <span className={`text-xs font-medium ${
                            successRate >= 80 ? 'text-green-600' :
                            successRate >= 60 ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>
                            {successRate}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}