import React from 'react';
import { Star, StarOff, Calendar, Eye } from 'lucide-react';

export default function FeedbackCard({ feedback, onViewResponses }) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 flex-1">
          {feedback.title}
        </h3>
        {feedback.is_rating ? (
          <Star className="text-orange-500 fill-orange-500" size={20} />
        ) : (
          <StarOff className="text-gray-400" size={20} />
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            feedback.is_rating 
              ? 'bg-orange-100 text-orange-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {feedback.is_rating ? 'Rating Enabled' : 'No Rating'}
          </span>
        </div>

        {feedback.created_at && (
          <div className="flex items-center gap-1 text-xs text-gray-500 pt-3 border-t">
            <Calendar size={12} />
            <span>{new Date(feedback.created_at).toLocaleDateString()}</span>
          </div>
        )}

        <button
          onClick={() => onViewResponses(feedback)}
          className="w-full mt-3 flex items-center justify-center gap-2 px-3 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors text-sm font-medium"
        >
          <Eye size={16} />
          View Responses
        </button>
      </div>
    </div>
  );
}