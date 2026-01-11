import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import NavigationTabs from '../components/dashboard/NavigationTabs';
import ErrorAlert from '../components/dashboard/ErrorAlert';
import Modal from '../components/dashboard/Modal';
import QuestionsTab from '../components/dashboard/questions/QuestionsTab';
import CreateQuestionModal from '../components/dashboard/questions/CreateQuestionModal';
import EditQuestionModal from '../components/dashboard/questions/EditQuestionModal';
import AnswersTab from '../components/dashboard/answers/AnswersTab';
import RulesTab from '../components/dashboard/rules/RulesTab';
import FeedbackTab from '../components/dashboard/feedback/FeedbackTab';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('questions');
  const [questions, setQuestions] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [rules, setRules] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    description: '',
    question: '',
    key: ''
  });

  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken') || '';
    setToken(savedToken);
  }, []);

  const fetchQuestions = async () => {
    if (!token) {
      setError('Please enter your Bearer token to access questions');
      setQuestions([]);
      return;
    }

    setLoading(true);
    setError('');
    try {
      const data = await api.getQuestionList(token);
      setQuestions(data.questions || []);
    } catch (err) {
      setError(`Failed to fetch questions: ${err.message}`);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubmissions = async () => {
    if (!token) {
      setError('Please enter your Bearer token to access submissions');
      setSubmissions([]);
      return;
    }

    setLoading(true);
    setError('');
    try {
      const data = await api.getSubmissions(token);
      setSubmissions(data.submitings || []);
    } catch (err) {
      setError(`Failed to fetch submissions: ${err.message}`);
      setSubmissions([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchRules = async () => {
    if (!token) {
      setError('Please enter your Bearer token to access rules');
      setRules(null);
      return;
    }

    setLoading(true);
    setError('');
    try {
      const data = await api.getRules(token);
      setRules(data.rule || null);
    } catch (err) {
      setError(`Failed to fetch rules: ${err.message}`);
      setRules(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeedback = async () => {
    if (!token) {
      setError('Please enter your Bearer token to access feedback');
      setFeedback([]);
      return;
    }

    setLoading(true);
    setError('');
    try {
      const data = await api.getFeedback(token);
      setFeedback(data.feedback || []);
    } catch (err) {
      setError(`Failed to fetch feedback: ${err.message}`);
      setFeedback([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'questions') {
      fetchQuestions();
    } else if (activeTab === 'answers') {
      fetchSubmissions();
    } else if (activeTab === 'rules') {
      fetchRules();
    } else if (activeTab === 'feedback') {
      fetchFeedback();
    }
  }, [activeTab, token]);

  const handleCreateQuestion = async () => {
    if (!token) {
      setError('Please enter your Bearer token first');
      return;
    }

    if (!newQuestion.title || !newQuestion.description || !newQuestion.question || !newQuestion.key) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await api.postCreateQuestion(newQuestion, token);
      
      if (data.question) {
        setQuestions([data.question, ...questions]);
        setShowModal(false);
        setNewQuestion({ title: '', description: '', question: '', key: '' });
        setError('');
      }
    } catch (err) {
      setError(`Failed to create question: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuestion = async () => {
    if (!selectedQuestion) return;
    if (!token) {
      setError('Please enter your Bearer token first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await api.putUpdateQuestion(selectedQuestion.id, {
        title: selectedQuestion.title,
        description: selectedQuestion.description,
        question: selectedQuestion.question,
        key: selectedQuestion.key
      }, token);
      
      if (data.question) {
        setQuestions(questions.map(q => q.id === data.question.id ? data.question : q));
        setShowModal(false);
        setSelectedQuestion(null);
        setError('');
      }
    } catch (err) {
      setError(`Failed to update question: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuestion = async (id) => {
    if (!token) {
      setError('Please enter your Bearer token first');
      return;
    }

    if (!confirm('Are you sure you want to delete this question?')) return;

    setLoading(true);
    setError('');

    try {
      await api.deleteQuestion(id, token);
      setQuestions(questions.filter(q => q.id !== id));
      setError('');
    } catch (err) {
      setError(`Failed to delete question: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSubmission = async (id) => {
    if (!token) {
      setError('Please enter your Bearer token first');
      return;
    }

    if (!confirm('Are you sure you want to delete this submission?')) return;

    setLoading(true);
    setError('');

    try {
      await api.deleteSubmission(id, token);
      setSubmissions(submissions.filter(s => s.id !== id));
      setError('');
    } catch (err) {
      setError(`Failed to delete submission: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (question) => {
    setSelectedQuestion({ ...question });
    setModalType('edit');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewQuestion({ title: '', description: '', question: '', key: '' });
    setSelectedQuestion(null);
    setError('');
  };

  const handleUpdateRules = async (newData) => {
    if (!token) {
      setError('Please enter your Bearer token first');
      throw new Error('Please enter your Bearer token first');
    }

    setLoading(true);
    setError('');

    try {
      const data = await api.putUpdateRules(newData, token);
      
      if (data.rule) {
        setRules(data.rule);
        setError('');
      }
    } catch (err) {
      setError(`Failed to update rules: ${err.message}`);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFeedback = (feedbackData) => {
    setFeedback([feedbackData, ...feedback]);
    if (token) {
      fetchFeedback();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <DashboardHeader token={token} setToken={setToken} />
      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorAlert error={error} />

        {!token && (
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg shadow-sm">
            <p className="text-sm text-blue-800">
              <strong>Authentication Required:</strong> Please enter your Bearer token in the header to access the dashboard features.
            </p>
          </div>
        )}

        {activeTab === 'questions' && (
          <QuestionsTab 
            questions={questions}
            loading={loading}
            onCreateClick={() => {
              if (!token) {
                setError('Please enter your Bearer token first');
                return;
              }
              setModalType('create');
              setShowModal(true);
            }}
            onEditClick={openEditModal}
            onDeleteClick={handleDeleteQuestion}
          />
        )}

        {activeTab === 'answers' && (
          <AnswersTab 
            submissions={submissions} 
            loading={loading}
            onDeleteClick={handleDeleteSubmission}
          />
        )}

        {activeTab === 'rules' && (
          <RulesTab 
            rules={rules} 
            loading={loading} 
            onUpdate={handleUpdateRules}
          />
        )}

        {activeTab === 'feedback' && (
          <FeedbackTab 
            feedback={feedback} 
            loading={loading} 
            onCreateClick={handleCreateFeedback}
          />
        )}
      </div>

      <Modal
        show={showModal}
        title={modalType === 'create' ? 'Create New Question' : 'Edit Question'}
        onClose={handleCloseModal}
      >
        {modalType === 'create' ? (
          <CreateQuestionModal
            key="create-modal"
            newQuestion={newQuestion}
            setNewQuestion={setNewQuestion}
            loading={loading}
            onSubmit={handleCreateQuestion}
            onClose={handleCloseModal}
          />
        ) : (
          <EditQuestionModal
            key={`edit-modal-${selectedQuestion?.id || 'new'}`}
            question={selectedQuestion}
            setQuestion={setSelectedQuestion}
            loading={loading}
            onSubmit={handleUpdateQuestion}
            onClose={handleCloseModal}
          />
        )}
      </Modal>
    </div>
  );
}