import React, { useState } from 'react';
import { ChevronDown, ChevronUp, User, FileCode, Calendar } from 'lucide-react';

export default function SubmissionCard({ submission }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {submission.user?.name || 'Unknown User'}
              </h3>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                submission.is_success 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {submission.is_success ? 'Success' : 'Failed'}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <User size={14} />
                <span>NIM: {submission.user?.nim || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-1">
                <User size={14} />
                <span>Kelompok: {submission.user?.kelompok || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-1">
                <FileCode size={14} />
                <span>Question #{submission.question_id}: {submission.question?.title || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{new Date(submission.created_at).toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>

        {expanded && (
          <div className="mt-4 space-y-4 border-t pt-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Question:</h4>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                {submission.question?.question || 'Question not available'}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Code Submission:</h4>
              <pre className="text-xs text-gray-800 bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>{submission.code}</code>
              </pre>
            </div>

            {submission.input && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Input:</h4>
                <pre className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg overflow-x-auto">
                  {submission.input}
                </pre>
              </div>
            )}

            {submission.output && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Output:</h4>
                <pre className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg overflow-x-auto">
                  {submission.output}
                </pre>
              </div>
            )}

            {submission.submiting_ai && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">AI Feedback:</h4>
                <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                  {submission.submiting_ai}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}