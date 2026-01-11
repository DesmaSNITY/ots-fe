import React, { useState } from 'react';
import { Plus, Star } from 'lucide-react';
import FeedbackCard from './FeedbackCard';
import CreateFeedbackModal from './CreateFeedbackModal';
import FeedbackResponsesModal from './FeedbackResponsesModal';
import Modal from '../Modal';

export default function FeedbackTab({ feedback, loading, onCreateClick }) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showResponsesModal, setShowResponsesModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const handleViewResponses = (feedbackItem) => {
    setSelectedFeedback(feedbackItem);
    setShowResponsesModal(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Feedback Management</h2>
          <p className="text-sm text-gray-500 mt-1">View and manage user feedback</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          <Plus size={18} />
          Create Feedback
        </button>
      </div>

      {loading ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500">Loading feedback...</p>
        </div>
      ) : feedback.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="flex justify-center mb-4">
            <Star className="text-gray-300" size={48} />
          </div>
          <p className="text-gray-500 mb-2">No feedback yet</p>
          <p className="text-sm text-gray-400">Create your first feedback item to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {feedback.map((item) => (
            <FeedbackCard 
              key={item.id} 
              feedback={item}
              onViewResponses={handleViewResponses}
            />
          ))}
        </div>
      )}

      <Modal
        show={showCreateModal}
        title="Create Feedback"
        onClose={() => setShowCreateModal(false)}
      >
        <CreateFeedbackModal
          onClose={() => setShowCreateModal(false)}
          onCreate={(data) => {
            onCreateClick(data);
            setShowCreateModal(false);
          }}
        />
      </Modal>

      <Modal
        show={showResponsesModal}
        title={`Responses: ${selectedFeedback?.title || ''}`}
        onClose={() => {
          setShowResponsesModal(false);
          setSelectedFeedback(null);
        }}
      >
        <FeedbackResponsesModal
          feedbackId={selectedFeedback?.id}
          onClose={() => {
            setShowResponsesModal(false);
            setSelectedFeedback(null);
          }}
        />
      </Modal>
    </div>
  );
}