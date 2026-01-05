import React, { useRef, useEffect, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import Alert from '../Alert';
import { Sparkles, Save, X } from 'lucide-react';

export default function CreateQuestionModal({ 
  newQuestion, 
  setNewQuestion, 
  loading, 
  onSubmit, 
  onClose 
}) {
  const quillRef = useRef(null);
  const editorRef = useRef(null);
  const [alert, setAlert] = useState({ show: false, type: 'error', message: '' });

  useEffect(() => {
    if (!editorRef.current && quillRef.current) {
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

      editorRef.current.on('text-change', () => {
        const html = editorRef.current.root.innerHTML;
        setNewQuestion({ ...newQuestion, question: html });
      });
    }

    // Set initial content if exists
    if (newQuestion.question && editorRef.current) {
      const delta = editorRef.current.clipboard.convert(newQuestion.question);
      editorRef.current.setContents(delta);
    }
  }, []);

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
  };

  const handleSubmit = () => {
    // Validate Title
    if (!newQuestion.title || newQuestion.title.trim() === '') {
      showAlert('error', 'Title is required. Please enter a title for the question.');
      return;
    }

    // Validate Description
    if (!newQuestion.description || newQuestion.description.trim() === '') {
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
    if (!newQuestion.key || !/^\d{10}$/.test(newQuestion.key)) {
      showAlert('error', 'Answer Key must be exactly 10 digits (numbers only).');
      return;
    }

    // All validations passed
    setAlert({ show: false, type: 'error', message: '' });
    onSubmit();
  };

  return (
    <div className="space-y-6">
      {alert.show && (
        <Alert 
          type={alert.type} 
          message={alert.message} 
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-bold text-gray-900">
          <Sparkles size={16} className="text-blue-500" />
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={newQuestion.title}
          onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-300"
          placeholder="e.g., Pemrograman Dasar - Soal 1"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-bold text-gray-900">
          <Sparkles size={16} className="text-indigo-500" />
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          value={newQuestion.description}
          onChange={(e) => setNewQuestion({ ...newQuestion, description: e.target.value })}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-300 resize-none"
          rows="3"
          placeholder="Brief description of the question topic"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-bold text-gray-900">
          <Sparkles size={16} className="text-purple-500" />
          Question <span className="text-red-500">*</span>
        </label>
        <div 
          ref={quillRef} 
          className="bg-white border-2 border-gray-200 rounded-xl hover:border-blue-300 transition-all duration-300 quill-custom"
          style={{ minHeight: '200px' }}
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-bold text-gray-900">
          <Sparkles size={16} className="text-green-500" />
          Answer Key <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={newQuestion.key}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '').slice(0, 10);
            setNewQuestion({ ...newQuestion, key: value });
          }}
          maxLength="10"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-300 font-mono text-lg tracking-wider"
          placeholder="1234567890"
        />
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">
            Must be exactly 10 digits
          </p>
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${
            newQuestion.key?.length === 10 
              ? 'bg-green-100 text-green-700' 
              : 'bg-gray-100 text-gray-600'
          }`}>
            {newQuestion.key?.length || 0}/10
          </span>
        </div>
      </div>

      <div className="flex gap-3 pt-6 border-t-2 border-gray-100">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl
                   hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-blue-500/30 
                   hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed 
                   disabled:hover:scale-100 font-bold"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Creating...
            </>
          ) : (
            <>
              <Save size={18} />
              Create Question
            </>
          )}
        </button>
        <button
          onClick={onClose}
          disabled={loading}
          className="px-6 py-3.5 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 
                   transition-all duration-300 disabled:opacity-50 font-bold hover:scale-[1.02] active:scale-[0.98]"
        >
          <X size={18} className="inline mr-2" />
          Cancel
        </button>
      </div>

      <style jsx>{`
        .quill-custom :global(.ql-toolbar) {
          border-top-left-radius: 0.75rem;
          border-top-right-radius: 0.75rem;
          border: none;
          background: linear-gradient(to right, #f9fafb, #f3f4f6);
        }
        
        .quill-custom :global(.ql-container) {
          border-bottom-left-radius: 0.75rem;
          border-bottom-right-radius: 0.75rem;
          border: none;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}