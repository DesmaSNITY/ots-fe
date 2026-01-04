import React, { useState, useEffect, useRef } from 'react';
import { Save, Edit2, Eye } from 'lucide-react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import Alert from '../Alert';

export default function RulesTab({ rules, loading, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState('');
  const [previewMode, setPreviewMode] = useState(true);
  const [alert, setAlert] = useState({ show: false, type: 'error', message: '' });
  
  const quillRef = useRef(null);
  const editorRef = useRef(null);
  const containerRef = useRef(null);

  // Load rules data into state when available
  useEffect(() => {
    if (rules?.data) {
      setEditedData(rules.data);
    }
  }, [rules]);

  // Initialize Quill when entering edit mode
  useEffect(() => {
    if (!isEditing || !quillRef.current) {
      return;
    }

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
        placeholder: 'Write rules and SOP content here...'
      });

      // Set the content
      if (editedData) {
        editorRef.current.root.innerHTML = editedData;
      }

      // Listen for changes
      editorRef.current.on('text-change', () => {
        const html = editorRef.current.root.innerHTML;
        setEditedData(html);
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
  }, [isEditing]);

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
  };

  const handleSave = async () => {
    // Validate content
    const textContent = editorRef.current?.getText().trim() || '';
    if (!textContent || textContent.length === 0) {
      showAlert('error', 'Rules content cannot be empty. Please write some content.');
      return;
    }

    try {
      console.log('Sending data to API:', editedData);
      await onUpdate(editedData);
      setIsEditing(false);
      setAlert({ show: false, type: 'error', message: '' });
      showAlert('success', 'Rules updated successfully!');
    } catch (error) {
      console.error('Update error:', error);
      showAlert('error', `Failed to update rules: ${error.message}`);
    }
  };

  const handleCancel = () => {
    setEditedData(rules?.data || '');
    setIsEditing(false);
    setAlert({ show: false, type: 'error', message: '' });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setPreviewMode(false);
  };

  // Default content if no rules exist
  const defaultContent = `
    <h2>SOP Pengisian Soal</h2>
    <p>Langkah-langkah membuat dan mengunggah soal:</p>
    <ol>
      <li>Buka menu <strong>Manajemen Soal</strong>.</li>
      <li>Klik tombol <em>Tambah Soal</em>.</li>
      <li>Isi pertanyaan menggunakan WYSIWYG editor.</li>
      <li>Simpan dan periksa hasil input.</li>
    </ol>
  `;

  const displayContent = editedData || rules?.data || defaultContent;

  return (
    <div>
      {alert.show && (
        <Alert 
          type={alert.type} 
          message={alert.message} 
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Rules & SOP Management</h2>
          <p className="text-sm text-gray-500 mt-1">
            {isEditing ? 'Edit the rules and SOP content' : 'View and manage system rules'}
          </p>
        </div>
        <div className="flex gap-2">
          {!isEditing && (
            <>
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Eye size={18} />
                {previewMode ? 'View HTML' : 'View Preview'}
              </button>
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit2 size={18} />
                Edit Rules
              </button>
            </>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {isEditing ? (
          <div className="p-6">
            <div className="mb-4" ref={containerRef}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rules & SOP Content <span className="text-red-500">*</span>
              </label>
              <div 
                ref={quillRef} 
                className="bg-white border border-gray-300 rounded-lg"
                style={{ minHeight: '400px' }}
              />
            </div>

            <div className="border-t pt-4 mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Live Preview:</h3>
              <div 
                className="prose max-w-none bg-gray-50 p-4 rounded-lg border min-h-[200px]"
                dangerouslySetInnerHTML={{ __html: editedData || '<p class="text-gray-400">Start writing to see preview...</p>' }}
              />
            </div>

            <div className="flex gap-3 mt-6 pt-6 border-t">
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                <Save size={18} />
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                onClick={handleCancel}
                disabled={loading}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Loading rules...</p>
              </div>
            ) : previewMode ? (
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: displayContent }}
              />
            ) : (
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{displayContent}</code>
              </pre>
            )}

            {rules?.updated_at && (
              <div className="mt-6 pt-6 border-t text-sm text-gray-500">
                <p>Last updated: {new Date(rules.updated_at).toLocaleString()}</p>
                {rules.created_at && (
                  <p>Created: {new Date(rules.created_at).toLocaleString()}</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}