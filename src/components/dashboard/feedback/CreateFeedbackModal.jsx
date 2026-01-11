import React, { useState } from 'react';
import { api } from '../../../services/api';
import Alert from '../Alert';

export default function CreateFeedbackModal({ onClose, onCreate }) {
  const [formData, setFormData] = useState({
    title: '',
    is_rating: false
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: 'error', message: '' });

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title || formData.title.trim() === '') {
      showAlert('error', 'Title is required. Please enter a feedback title.');
      return;
    }

    setLoading(true);
    setAlert({ show: false, type: 'error', message: '' });

    try {
      const token = localStorage.getItem('adminToken');
      console.log("test api",token)
      if (!token) {
        showAlert('error', 'Please login first.');
        return;
      }

      // Convert boolean to string "true" or "false" for API
      const apiData = {
        title: formData.title,
        is_rating: formData.is_rating ? 'true' : 'false'
      };
      
      const response = await api.postCreateFeedback(apiData, token);

      if (response.feedback) {
        showAlert('success', 'Feedback created successfully!');
        setTimeout(() => {
          onCreate(response.feedback);
        }, 1000);
      }
    } catch (err) {
      showAlert('error', `Failed to create feedback: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {alert.show && (
        <Alert 
          type={alert.type} 
          message={alert.message} 
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="e.g., Rate our service"
            required
          />
        </div>

        <div className="mb-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.is_rating}
              onChange={(e) => setFormData({ ...formData, is_rating: e.target.checked })}
              className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
            />
            <div>
              <span className="text-sm font-medium text-gray-700">Enable Rating</span>
              <p className="text-xs text-gray-500">Allow users to rate with stars</p>
            </div>
          </label>
        </div>

        <div className="flex gap-3 pt-4 border-t">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? 'Creating...' : 'Create Feedback'}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}