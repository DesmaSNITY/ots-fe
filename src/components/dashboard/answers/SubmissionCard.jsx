import React, { useState } from 'react';
import { ChevronDown, ChevronUp, User, FileCode, Calendar, Trash2, Award, Code2, Terminal } from 'lucide-react';

export default function SubmissionCard({ submission, onDeleteClick }) {
  const [expanded, setExpanded] = useState(false);

  if (!submission) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 animate-slide-in">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <User className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {submission.user?.name || 'Unknown User'}
                </h3>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                  submission.is_success 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30' 
                    : 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/30'
                }`}>
                  {submission.is_success ? (
                    <>
                      <Award size={12} />
                      Success
                    </>
                  ) : (
                    <>
                      <span>✕</span>
                      Failed
                    </>
                  )}
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 text-sm text-gray-600">
              {submission.user?.nim && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg">
                  <User size={14} className="text-blue-500" />
                  <span className="font-medium">NIM: {submission.user.nim}</span>
                </div>
              )}
              {submission.user?.kelompok && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg">
                  <User size={14} className="text-purple-500" />
                  <span className="font-medium">Kelompok: {submission.user.kelompok}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg">
                <FileCode size={14} className="text-indigo-500" />
                <span className="font-medium">
                  Q#{submission.question_id}
                  {submission.question?.title && `: ${submission.question.title}`}
                </span>
              </div>
              {submission.created_at && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg">
                  <Calendar size={14} className="text-green-500" />
                  <span className="font-medium">{new Date(submission.created_at).toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={() => onDeleteClick(submission.id)}
              className="p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95"
              title="Delete submission"
            >
              <Trash2 size={18} />
            </button>
            <button
              onClick={() => setExpanded(!expanded)}
              className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-300 flex-shrink-0 hover:scale-110 active:scale-95"
              aria-label={expanded ? "Collapse details" : "Expand details"}
            >
              {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
        </div>

        {expanded && (
          <div className="mt-6 space-y-4 border-t border-gray-100 pt-6 animate-expand">
            {submission.question?.question && (
              <div className="group">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                    <FileCode className="text-white" size={16} />
                  </div>
                  <h4 className="text-sm font-bold text-gray-900">Question</h4>
                </div>
                <div className="text-sm text-gray-700 bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                  <div dangerouslySetInnerHTML={{ 
                    __html: submission.question.question || '<p>No question content</p>' 
                  }} />
                </div>
              </div>
            )}

            {submission.code && (
              <div className="group">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                    <Code2 className="text-white" size={16} />
                  </div>
                  <h4 className="text-sm font-bold text-gray-900">Code Submission</h4>
                </div>
                <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg">
                  <div className="bg-gray-800 px-4 py-2 flex items-center gap-2 border-b border-gray-700">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-xs text-gray-400 ml-2">solution.py</span>
                  </div>
                  <pre className="text-xs text-gray-100 p-4 overflow-x-auto m-0 font-mono">
                    <code>{submission.code}</code>
                  </pre>
                </div>
              </div>
            )}

            {submission.input && (
              <div className="group">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                    <Terminal className="text-white" size={16} />
                  </div>
                  <h4 className="text-sm font-bold text-gray-900">Input</h4>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 overflow-hidden">
                  <pre className="text-sm text-gray-700 p-4 overflow-x-auto m-0 whitespace-pre-wrap font-mono">
                    {submission.input}
                  </pre>
                </div>
              </div>
            )}

            {submission.output && (
              <div className="group">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                    <Terminal className="text-white" size={16} />
                  </div>
                  <h4 className="text-sm font-bold text-gray-900">Output</h4>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-200 overflow-hidden">
                  <pre className="text-sm text-gray-700 p-4 overflow-x-auto m-0 whitespace-pre-wrap font-mono">
                    {submission.output}
                  </pre>
                </div>
              </div>
            )}

            {submission.submiting_ai && (
              <div className="group">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                    <Award className="text-white" size={16} />
                  </div>
                  <h4 className="text-sm font-bold text-gray-900">AI Feedback</h4>
                </div>
                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl border border-cyan-200 p-4 space-y-3">
                  {submission.submiting_ai.deskripsi_singkat && (
                    <div>
                      <p className="text-xs font-bold text-cyan-900 mb-1.5">Description:</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{submission.submiting_ai.deskripsi_singkat}</p>
                    </div>
                  )}
                  {submission.submiting_ai.score !== null && submission.submiting_ai.score !== undefined && (
                    <div>
                      <p className="text-xs font-bold text-cyan-900 mb-1.5">Score:</p>
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-bold text-lg shadow-lg shadow-cyan-500/30">
                        <Award size={20} />
                        {submission.submiting_ai.score}
                      </div>
                    </div>
                  )}
                  {!submission.submiting_ai.deskripsi_singkat && !submission.submiting_ai.score && (
                    <p className="text-sm text-gray-500 italic">No AI feedback details available</p>
                  )}
                </div>
              </div>
            )}

            {!submission.question?.question && !submission.code && !submission.input && !submission.output && !submission.submiting_ai && (
              <div className="text-center py-8 text-gray-400 text-sm">
                No additional details available
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');
        
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes expand {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 2000px;
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.4s ease-out;
        }
        
        .animate-expand {
          animation: expand 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}