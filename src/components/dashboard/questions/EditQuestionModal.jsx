// ============================================
// FILE: src/components/dashboard/questions/EditQuestionModal.jsx
// ============================================
import React, { useRef, useEffect, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import Alert from '../Alert';

export default function EditQuestionModal({ 
  question, 
  setQuestion, 
  loading, 
  onSubmit, 
  onClose 
}) {
  const quillRef = useRef(null);
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const [alert, setAlert] = useState({ show: false, type: 'error', message: '' });

  useEffect(() => {
    if (!question) return;

    // Clean up any existing editor first
    if (editorRef.current) {
      try {
        const toolbar = containerRef.current?.querySelector('.ql-toolbar');
        if (toolbar) {
          toolbar.remove();
        }
        editorRef.current = null;
      } catch (e) {
        console.error('Cleanup error:', e);
      }
    }

    // Wait for DOM to be ready
    const timer = setTimeout(() => {
      if (!quillRef.current) return;

      // Clear any existing content
      quillRef.current.innerHTML = '';

      // Initialize fresh Quill instance
      editorRef.current = new Quill(quillRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'color': [] }, { 'background': [] }],
            ['link', 'image'],
            ['clean']
          ]
        },
        placeholder: 'Write your question here...'
      });

      // Set the content
      if (question.question) {
        editorRef.current.root.innerHTML = question.question;
      }

      // Listen for changes
      editorRef.current.on('text-change', () => {
        const html = editorRef.current.root.innerHTML;
        setQuestion(prev => ({ ...prev, question: html }));
      });
    }, 0);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      if (editorRef.current) {
        try {
          editorRef.current.off('text-change');
        } catch (e) {
          // Already cleaned up
        }
        editorRef.current = null;
      }
    };
  }, [question?.id]); // Re-initialize when question changes

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
  };

  const handleSubmit = () => {
    // Validate Title
    if (!question.title || question.title.trim() === '') {
      showAlert('error', 'Title is required. Please enter a title for the question.');
      return;
    }

    // Validate Description
    if (!question.description || question.description.trim() === '') {
      showAlert('error', 'Description is required. Please enter a description.');
      return;
    }

    // Validate Question (check if Quill editor has content)
    const questionText = editorRef.current?.getText().trim() || '';
    if (!questionText || questionText.length === 0) {
      showAlert('error', 'Question is required. Please write the question content.');
      return;
    }

    // Validate Answer Key (must be exactly 10 digits)
    if (!question.key || !/^\d{10}$/.test(question.key)) {
      showAlert('error', 'Answer Key must be exactly 10 digits (numbers only).');
      return;
    }

    // All validations passed
    setAlert({ show: false, type: 'error', message: '' });
    onSubmit();
  };

  if (!question) return null;

  return (
    <div className="space-y-4">
      {alert.show && (
        <Alert 
          type={alert.type} 
          message={alert.message} 
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={question.title}
          onChange={(e) => setQuestion({ ...question, title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., Pemrograman Dasar - Soal 1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          value={question.description}
          onChange={(e) => setQuestion({ ...question, description: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows="3"
          placeholder="Brief description of the question topic"
        />
      </div>

      <div ref={containerRef}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Question <span className="text-red-500">*</span>
        </label>
        <div 
          ref={quillRef} 
          className="bg-white border border-gray-300 rounded-lg"
          style={{ minHeight: '200px' }}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Answer Key <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={question.key}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '').slice(0, 10);
            setQuestion({ ...question, key: value });
          }}
          maxLength="10"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
          placeholder="1234567890"
        />
        <p className="mt-1 text-xs text-gray-500">
          Must be exactly 10 digits. Current: {question.key?.length || 0}/10
        </p>
      </div>

      <div className="flex gap-3 pt-4 border-t">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {loading ? 'Updating...' : 'Update Question'}
        </button>
        <button
          onClick={onClose}
          disabled={loading}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 font-medium"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}