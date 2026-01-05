import React, { useState } from 'react';
import SubmissionCard from './SubmissionCard';

export default function AnswersTab({ submissions, loading }) {
  const [filter, setFilter] = useState('all');

  const filteredSubmissions = submissions.filter(sub => {
    if (filter === 'success') return sub.is_success;
    if (filter === 'failed') return !sub.is_success;
    return true;
  });

  const successCount = submissions.filter(s => s.is_success).length;
  const failedCount = submissions.filter(s => !s.is_success).length;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">User Submissions</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'border border-gray-300 hover:bg-gray-50'
            }`}
          >
            All ({submissions.length})
          </button>
          <button 
            onClick={() => setFilter('success')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'success' 
                ? 'bg-green-600 text-white' 
                : 'border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Success ({successCount})
          </button>
          <button 
            onClick={() => setFilter('failed')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'failed' 
                ? 'bg-red-600 text-white' 
                : 'border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Failed ({failedCount})
          </button>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500">Loading submissions...</p>
        </div>
      ) : filteredSubmissions.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500">No submissions found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSubmissions.map((submission) => (
            <SubmissionCard key={submission.id} submission={submission} />
          ))}
        </div>
      )}
    </div>
  );
}