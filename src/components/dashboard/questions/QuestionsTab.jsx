import React from 'react';
import { Plus, Sparkles } from 'lucide-react';
import QuestionsTable from './QuestionsTable';

export default function QuestionsTab({ questions, loading, onCreateClick, onEditClick, onDeleteClick }) {
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Question Management
          </h2>
          <p className="text-sm text-gray-500">Create and manage your question library</p>
        </div>
        <button
          onClick={onCreateClick}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl
                   hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-blue-500/30 
                   hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] font-semibold group"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          <span>Create Question</span>
        </button>
      </div>
      
      {loading ? (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-600" size={24} />
            </div>
            <p className="text-gray-500 font-medium">Loading questions...</p>
          </div>
        </div>
      ) : questions.length === 0 ? (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg border border-blue-100 p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/30">
              <Plus className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No questions yet</h3>
            <p className="text-gray-600 mb-6">Get started by creating your first question!</p>
            <button
              onClick={onCreateClick}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl
                       hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-blue-500/30 
                       hover:shadow-blue-500/50 font-semibold"
            >
              <Plus size={18} />
              Create First Question
            </button>
          </div>
        </div>
      ) : (
        <QuestionsTable 
          questions={questions} 
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
        />
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