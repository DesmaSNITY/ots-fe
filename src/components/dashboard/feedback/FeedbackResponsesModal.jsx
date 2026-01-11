import React, { useState, useEffect } from 'react';
import { api } from '../../../services/api';
import { User, Star, MessageSquare, Calendar } from 'lucide-react';

export default function FeedbackResponsesModal({ feedbackId, onClose }) {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (feedbackId) {
      fetchResponses();
    }
  }, [feedbackId]);

  const fetchResponses = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('adminToken');
      const data = await api.getFeedbackResponses(feedbackId, token);
      setResponses(data.response || []);
    } catch (err) {
      setError(`Failed to fetch responses: ${err.message}`);
      setResponses([]);
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const totalResponses = responses.length;
  const ratingsOnly = responses.filter(r => r.rating !== null && r.rating !== undefined);
  const averageRating = ratingsOnly.length > 0 
    ? (ratingsOnly.reduce((sum, r) => sum + r.rating, 0) / ratingsOnly.length).toFixed(1)
    : null;

  if (loading) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-500">Loading responses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 text-center">
        <p className="text-red-600 text-sm">{error}</p>
        <button
          onClick={fetchResponses}
          className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  if (responses.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="flex justify-center mb-4">
          <MessageSquare className="text-gray-300" size={48} />
        </div>
        <p className="text-gray-500 mb-2">No responses yet</p>
        <p className="text-sm text-gray-400">Users haven't submitted any responses for this feedback</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Statistics Header */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-orange-50 rounded-lg border border-orange-100">
          <p className="text-xs text-orange-600 font-medium">Total Responses</p>
          <p className="text-2xl font-bold text-orange-700">{totalResponses}</p>
        </div>
        {averageRating && (
          <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-100">
            <p className="text-xs text-yellow-600 font-medium">Average Rating</p>
            <div className="flex items-center gap-1">
              <Star className="text-yellow-500 fill-yellow-500" size={20} />
              <p className="text-2xl font-bold text-yellow-700">{averageRating}</p>
            </div>
          </div>
        )}
      </div>

      {/* Responses List */}
      <div className="max-h-[50vh] overflow-y-auto space-y-3">
        {responses.map((response) => (
          <div key={response.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-orange-200 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <User size={16} className="text-orange-600" />
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">
                    User #{response.user_id}
                  </span>
                  {response.submiting_id && (
                    <p className="text-xs text-gray-400">
                      Submission #{response.submiting_id}
                    </p>
                  )}
                </div>
              </div>
              {response.rating !== null && response.rating !== undefined && (
                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                  <Star className="text-yellow-500 fill-yellow-500" size={14} />
                  <span className="text-sm font-semibold text-yellow-700">
                    {response.rating}
                  </span>
                </div>
              )}
            </div>

            {response.comments && (
              <div className="mb-3 p-3 bg-white rounded border border-gray-100">
                <p className="text-sm text-gray-600 flex items-start gap-2">
                  <MessageSquare size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="break-words">{response.comments}</span>
                </p>
              </div>
            )}

            {!response.comments && response.rating !== null && response.rating !== undefined && (
              <div className="mb-3 p-3 bg-white rounded border border-gray-100">
                <p className="text-xs text-gray-400 italic">No comments provided</p>
              </div>
            )}

            <div className="flex items-center gap-4 text-xs text-gray-400 pt-2 border-t border-gray-200">
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                <span>{new Date(response.created_at).toLocaleString()}</span>
              </div>
              {response.updated_at !== response.created_at && (
                <span className="text-gray-400">
                  Updated: {new Date(response.updated_at).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t">
        <button
          onClick={onClose}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          Close
        </button>
      </div>
    </div>
  );
}