import React, { useState, useEffect } from 'react';
import { AlertCircle, Plus, BookOpen, Users, ClipboardCheck, X, Save, Eye, Edit2, Trash2 } from 'lucide-react';

const API_BASE = `${import.meta.env.VITE_ENDPOINT}/api`;

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('questions');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    description: '',
    question: '',
    key: ''
  });

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [gradeData, setGradeData] = useState({
    score: '',
    feedback: ''
  });

  // Load token from state (in real app, use proper auth)
  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken') || '';
    setToken(savedToken);
  }, []);

  // Fetch questions
  const fetchQuestions = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE}/question`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setQuestions(data.questions || data || []);
      } else {
        // Mock data for demonstration
        setQuestions([
          { id: 1, title: 'PHP Basics', description: 'Basic PHP concepts', question: 'What is PHP?', key: '12345', created_at: '2025-11-26T03:46:10.000000Z' },
          { id: 2, title: 'JavaScript Arrays', description: 'Array manipulation', question: 'How to iterate arrays?', key: '67890', created_at: '2025-11-26T04:20:15.000000Z' }
        ]);
      }
    } catch (err) {
      setError('Failed to fetch questions. Using mock data.');
      setQuestions([
        { id: 1, title: 'PHP Basics', description: 'Basic PHP concepts', question: 'What is PHP?', key: '12345', created_at: '2025-11-26T03:46:10.000000Z' },
        { id: 2, title: 'JavaScript Arrays', description: 'Array manipulation', question: 'How to iterate arrays?', key: '67890', created_at: '2025-11-26T04:20:15.000000Z' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch answers (mock for now)
  const fetchAnswers = () => {
    setAnswers([
      { id: 1, question_id: 1, user_id: 1, user_name: 'John Doe', answer: 'PHP is a server-side scripting language...', submitted_at: '2025-11-26T05:30:00.000000Z', score: null, feedback: null, status: 'pending' },
      { id: 2, question_id: 2, user_id: 2, user_name: 'Jane Smith', answer: 'You can use forEach, map, filter...', submitted_at: '2025-11-26T06:15:00.000000Z', score: 85, feedback: 'Good explanation!', status: 'graded' },
      { id: 3, question_id: 1, user_id: 3, user_name: 'Bob Wilson', answer: 'PHP stands for PHP: Hypertext Preprocessor...', submitted_at: '2025-11-26T07:00:00.000000Z', score: null, feedback: null, status: 'pending' }
    ]);
  };

  // Fetch users (mock for now)
  const fetchUsers = () => {
    setUsers([
      { id: 1, name: 'John Doe', email: 'john@example.com', total_answers: 5, avg_score: 78, status: 'active' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', total_answers: 8, avg_score: 92, status: 'active' },
      { id: 3, name: 'Bob Wilson', email: 'bob@example.com', total_answers: 3, avg_score: 65, status: 'active' }
    ]);
  };

  useEffect(() => {
    if (activeTab === 'questions') fetchQuestions();
    if (activeTab === 'answers') fetchAnswers();
    if (activeTab === 'users') fetchUsers();
  }, [activeTab, token]);

  // Create new question
  const handleCreateQuestion = async () => {
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('title', newQuestion.title);
    formData.append('description', newQuestion.description);
    formData.append('question', newQuestion.question);
    formData.append('key', newQuestion.key);

    try {
      const response = await fetch(`${API_BASE}/question`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setQuestions([...questions, data.question]);
        setShowModal(false);
        setNewQuestion({ title: '', description: '', question: '', key: '' });
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to create question');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  // Grade answer
  const handleGradeAnswer = async () => {
    setLoading(true);
    
    // Mock grading (replace with actual API when available)
    setTimeout(() => {
      setAnswers(answers.map(ans => 
        ans.id === selectedAnswer.id 
          ? { ...ans, score: parseInt(gradeData.score), feedback: gradeData.feedback, status: 'graded' }
          : ans
      ));
      setShowModal(false);
      setSelectedAnswer(null);
      setGradeData({ score: '', feedback: '' });
      setLoading(false);
    }, 500);
  };

  const openGradeModal = (answer) => {
    setSelectedAnswer(answer);
    setGradeData({ score: answer.score || '', feedback: answer.feedback || '' });
    setModalType('grade');
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-500">Manage questions, answers, and user grading</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="password"
                placeholder="Bearer Token"
                value={token}
                onChange={(e) => {
                  setToken(e.target.value);
                  localStorage.setItem('adminToken', e.target.value);
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('questions')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'questions'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <BookOpen size={18} />
                <span>Questions</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('answers')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'answers'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <ClipboardCheck size={18} />
                <span>Answers & Grading</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'users'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <Users size={18} />
                <span>Users</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="text-yellow-600 flex-shrink-0" size={20} />
            <p className="text-sm text-yellow-800">{error}</p>
          </div>
        )}

        {/* Questions Tab */}
        {activeTab === 'questions' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Question Management</h2>
              <button
                onClick={() => {
                  setModalType('create');
                  setShowModal(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={18} />
                Create Question
              </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Question</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {questions.map((q) => (
                      <tr key={q.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{q.id}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{q.title}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{q.description}</td>
                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{q.question}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(q.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex gap-2">
                            <button className="text-blue-600 hover:text-blue-800">
                              <Eye size={16} />
                            </button>
                            <button className="text-green-600 hover:text-green-800">
                              <Edit2 size={16} />
                            </button>
                            <button className="text-red-600 hover:text-red-800">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Answers Tab */}
        {activeTab === 'answers' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Answer Grading</h2>
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                  All ({answers.length})
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                  Pending ({answers.filter(a => a.status === 'pending').length})
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                  Graded ({answers.filter(a => a.status === 'graded').length})
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {answers.map((ans) => (
                <div key={ans.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{ans.user_name}</h3>
                      <p className="text-sm text-gray-500">
                        Question #{ans.question_id} • Submitted {new Date(ans.submitted_at).toLocaleString()}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      ans.status === 'graded' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {ans.status === 'graded' ? `Score: ${ans.score}` : 'Pending'}
                    </span>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Answer:</h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">{ans.answer}</p>
                  </div>

                  {ans.status === 'graded' && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Feedback:</h4>
                      <p className="text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">{ans.feedback}</p>
                    </div>
                  )}

                  <button
                    onClick={() => openGradeModal(ans)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <Save size={16} />
                    {ans.status === 'graded' ? 'Update Grade' : 'Grade Answer'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">User Management</h2>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Answers</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg Score</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{user.id}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{user.total_answers}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            user.avg_score >= 80 ? 'bg-green-100 text-green-800' :
                            user.avg_score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {user.avg_score}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                            {user.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                {modalType === 'create' ? 'Create New Question' : 'Grade Answer'}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  setNewQuestion({ title: '', description: '', question: '', key: '' });
                  setSelectedAnswer(null);
                  setGradeData({ score: '', feedback: '' });
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              {modalType === 'create' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      value={newQuestion.title}
                      onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={newQuestion.description}
                      onChange={(e) => setNewQuestion({ ...newQuestion, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="3"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                    <textarea
                      value={newQuestion.question}
                      onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="4"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Answer Key</label>
                    <input
                      type="text"
                      value={newQuestion.key}
                      onChange={(e) => setNewQuestion({ ...newQuestion, key: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleCreateQuestion}
                      disabled={loading}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Creating...' : 'Create Question'}
                    </button>
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
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
                          onClick={handleGradeAnswer}
                          disabled={loading}
                          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                          {loading ? 'Saving...' : 'Save Grade'}
                        </button>
                        <button
                          onClick={() => setShowModal(false)}
                          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}