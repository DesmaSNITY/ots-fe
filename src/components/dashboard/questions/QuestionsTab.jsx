import React from 'react';
import { Plus } from 'lucide-react';
import QuestionsTable from './QuestionsTable';

export default function QuestionsTab({ questions, loading, onCreateClick, onEditClick, onDeleteClick }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Question Management</h2>
        <button
          onClick={onCreateClick}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          Create Question
        </button>
      </div>
      
      {loading ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500">Loading questions...</p>
        </div>
      ) : questions.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500">No questions found. Create your first question!</p>
        </div>
      ) : (
        <QuestionsTable 
          questions={questions} 
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
        />
      )}
    </div>
  );
}