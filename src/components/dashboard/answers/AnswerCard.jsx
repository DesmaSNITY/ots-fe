import React from 'react';
import { Save } from 'lucide-react';

export default function AnswerCard({ answer, onGrade }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{answer.user_name}</h3>
          <p className="text-sm text-gray-500">
            Question #{answer.question_id} • Submitted {new Date(answer.submitted_at).toLocaleString()}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          answer.status === 'graded' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {answer.status === 'graded' ? `Score: ${answer.score}` : 'Pending'}
        </span>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Answer:</h4>
        <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">{answer.answer}</p>
      </div>

      {answer.status === 'graded' && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Feedback:</h4>
          <p className="text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">{answer.feedback}</p>
        </div>
      )}

      <button
        onClick={() => onGrade(answer)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
      >
        <Save size={16} />
        {answer.status === 'graded' ? 'Update Grade' : 'Grade Answer'}
      </button>
    </div>
  );
}