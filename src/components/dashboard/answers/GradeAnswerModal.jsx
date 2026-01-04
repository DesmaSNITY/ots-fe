import React from 'react';

export default function GradeAnswerModal({ 
  selectedAnswer, 
  gradeData, 
  setGradeData, 
  loading, 
  onSubmit, 
  onClose 
}) {
  return (
    <div className="space-y-4">
      {selectedAnswer && (
        <>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Student Answer:</h4>
            <p className="text-sm text-gray-600">{selectedAnswer.answer}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Score (0-100)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={gradeData.score}
              onChange={(e) => setGradeData({ ...gradeData, score: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Feedback</label>
            <textarea
              value={gradeData.feedback}
              onChange={(e) => setGradeData({ ...gradeData, feedback: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="4"
              placeholder="Provide constructive feedback to the student..."
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={onSubmit}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Grade'}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
}