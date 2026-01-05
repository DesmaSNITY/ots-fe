import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import NavigationTabs from '../components/dashboard/NavigationTabs';
import ErrorAlert from '../components/dashboard/ErrorAlert';
import Modal from '../components/dashboard/Modal';
import ConfirmDialog from '../components/dashboard/ConfirmDialog';
import QuestionsTab from '../components/dashboard/questions/QuestionsTab';
import CreateQuestionModal from '../components/dashboard/questions/CreateQuestionModal';
import EditQuestionModal from '../components/dashboard/questions/EditQuestionModal';
import AnswersTab from '../components/dashboard/answers/AnswersTab';
import RulesTab from '../components/dashboard/rules/RulesTab';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('questions');
  const [questions, setQuestions] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [rules, setRules] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  
  // Confirm dialog state
  const [confirmDialog, setConfirmDialog] = useState({
    show: false,
    title: '',
    message: '',
    onConfirm: null,
    type: 'danger'
  });
  
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

  useEffect(() => {
    if (activeTab === 'questions') {
      fetchQuestions();
    } else if (activeTab === 'answers') {
      fetchSubmissions();
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

  const handleDeleteQuestion = (id) => {
    if (!token) {
      setError('Please enter your Bearer token first');
      return;
    }

    const question = questions.find(q => q.id === id);
    setConfirmDialog({
      show: true,
      title: 'Delete Question',
      message: `Are you sure you want to delete "${question?.title || 'this question'}"? This action cannot be undone.`,
      type: 'danger',
      onConfirm: async () => {
        setConfirmDialog({ ...confirmDialog, show: false });
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
      }
    });
  };

  const handleDeleteSubmission = (id) => {
    if (!token) {
      setError('Please enter your Bearer token first');
      return;
    }

    const submission = submissions.find(s => s.id === id);
    setConfirmDialog({
      show: true,
      title: 'Delete Submission',
      message: `Are you sure you want to delete submission from ${submission?.user?.name || 'this user'}? This action cannot be undone.`,
      type: 'danger',
      onConfirm: async () => {
        setConfirmDialog({ ...confirmDialog, show: false });
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
      }
    });
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
      return;
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

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader token={token} setToken={setToken} />
      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorAlert error={error} />

        {!token && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
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
      </div>

      {/* Modal for Create/Edit */}
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

      {/* Confirm Dialog */}
      <ConfirmDialog
        show={confirmDialog.show}
        title={confirmDialog.title}
        message={confirmDialog.message}
        type={confirmDialog.type}
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog({ ...confirmDialog, show: false })}
      />
    </div>
  );
}