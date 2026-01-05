import React, { useState } from 'react';
import { Filter, CheckCircle, XCircle, Sparkles } from 'lucide-react';
import SubmissionCard from './SubmissionCard';

export default function AnswersTab({ submissions, loading, onDeleteClick }) {
  const [filter, setFilter] = useState('all');
  
  const filteredSubmissions = submissions.filter(sub => {
    if (filter === 'success') return sub.is_success;
    if (filter === 'failed') return !sub.is_success;
    return true;
  });
  
  const successCount = submissions.filter(s => s.is_success).length;
  const failedCount = submissions.filter(s => !s.is_success).length;
  
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
            User Submissions
          </h2>
          <p className="text-sm text-gray-500">Review and manage student submissions</p>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setFilter('all')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
              filter === 'all' 
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30' 
                : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-600'
            }`}
          >
            <Filter size={16} />
            All <span className="ml-1 px-2 py-0.5 rounded-full bg-white/20 text-xs font-bold">{submissions.length}</span>
          </button>
          <button 
            onClick={() => setFilter('success')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
              filter === 'success' 
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30' 
                : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-green-300 hover:text-green-600'
            }`}
          >
            <CheckCircle size={16} />
            Success <span className="ml-1 px-2 py-0.5 rounded-full bg-white/20 text-xs font-bold">{successCount}</span>
          </button>
          <button 
            onClick={() => setFilter('failed')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
              filter === 'failed' 
                ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/30' 
                : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-red-300 hover:text-red-600'
            }`}
          >
            <XCircle size={16} />
            Failed <span className="ml-1 px-2 py-0.5 rounded-full bg-white/20 text-xs font-bold">{failedCount}</span>
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
              <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-green-600" size={24} />
            </div>
            <p className="text-gray-500 font-medium">Loading submissions...</p>
          </div>
        </div>
      ) : filteredSubmissions.length === 0 ? (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg border border-green-100 p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/30">
              <CheckCircle className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No submissions found</h3>
            <p className="text-gray-600">
              {filter === 'all' ? 'No submissions yet.' : `No ${filter} submissions found.`}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSubmissions.map((submission) => (
            <SubmissionCard 
              key={submission.id} 
              submission={submission}
              onDeleteClick={onDeleteClick}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}