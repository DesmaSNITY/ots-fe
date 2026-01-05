import React, { useState } from 'react';
import { ChevronDown, ChevronUp, User, FileCode, Calendar } from 'lucide-react';

export default function SubmissionCard({ submission }) {
  const [expanded, setExpanded] = useState(false);

  if (!submission) return null;

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
              {submission.user?.nim && (
                <div className="flex items-center gap-1">
                  <User size={14} />
                  <span>NIM: {submission.user.nim}</span>
                </div>
              )}
              {submission.user?.kelompok && (
                <div className="flex items-center gap-1">
                  <User size={14} />
                  <span>Kelompok: {submission.user.kelompok}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <FileCode size={14} />
                <span>
                  Question #{submission.question_id}
                  {submission.question?.title && `: ${submission.question.title}`}
                </span>
              </div>
              {submission.created_at && (
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{new Date(submission.created_at).toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>
          
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            aria-label={expanded ? "Collapse details" : "Expand details"}
          >
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>

        {expanded && (
          <div className="mt-4 space-y-4 border-t pt-4">
            {submission.question?.question && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Question:</h4>
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <div dangerouslySetInnerHTML={{ 
                    __html: submission.question.question || '<p>No question content</p>' 
                  }} />
                </div>
              </div>
            )}

            {submission.code && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Code Submission:</h4>
                <div className="bg-gray-900 rounded-lg overflow-hidden">
                  <pre className="text-xs text-gray-100 p-4 overflow-x-auto m-0">
                    <code>{submission.code}</code>
                  </pre>
                </div>
              </div>
            )}

            {submission.input && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Input:</h4>
                <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                  <pre className="text-sm text-gray-600 p-3 overflow-x-auto m-0 whitespace-pre-wrap">
                    {submission.input}
                  </pre>
                </div>
              </div>
            )}

            {submission.output && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Output:</h4>
                <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                  <pre className="text-sm text-gray-600 p-3 overflow-x-auto m-0 whitespace-pre-wrap">
                    {submission.output}
                  </pre>
                </div>
              </div>
            )}

            {submission.submiting_ai && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">AI Feedback:</h4>
                <div className="bg-blue-50 rounded-lg border border-blue-200 p-4 space-y-2">
                  {submission.submiting_ai.deskripsi_singkat && (
                    <div>
                      <p className="text-xs font-medium text-blue-900 mb-1">Description:</p>
                      <p className="text-sm text-gray-700">{submission.submiting_ai.deskripsi_singkat}</p>
                    </div>
                  )}
                  {submission.submiting_ai.score !== null && submission.submiting_ai.score !== undefined && (
                    <div>
                      <p className="text-xs font-medium text-blue-900 mb-1">Score:</p>
                      <p className="text-sm font-semibold text-blue-600">{submission.submiting_ai.score}</p>
                    </div>
                  )}
                  {!submission.submiting_ai.deskripsi_singkat && !submission.submiting_ai.score && (
                    <p className="text-sm text-gray-500">No AI feedback details available</p>
                  )}
                </div>
              </div>
            )}

            {!submission.question?.question && !submission.code && !submission.input && !submission.output && !submission.submiting_ai && (
              <div className="text-center py-4 text-gray-400 text-sm">
                No additional details available
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}