import React, { useEffect } from 'react';
import { AlertCircle, CheckCircle, X, AlertTriangle } from 'lucide-react';

export default function Alert({ type = 'error', message, onClose, autoClose = true }) {
  useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  const styles = {
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: <AlertCircle className="text-red-500" size={20} />,
      iconBg: 'bg-red-100'
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: <CheckCircle className="text-green-500" size={20} />,
      iconBg: 'bg-green-100'
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: <AlertTriangle className="text-yellow-500" size={20} />,
      iconBg: 'bg-yellow-100'
    }
  };

  const style = styles[type] || styles.error;

  if (!message) return null;

  return (
    <div className={`${style.bg} border ${style.border} rounded-lg p-4 mb-4 shadow-sm animate-slideDown`}>
      <div className="flex items-start gap-3">
        <div className={`${style.iconBg} rounded-full p-1 flex-shrink-0`}>
          {style.icon}
        </div>
        <div className="flex-1">
          <p className={`text-sm font-medium ${style.text}`}>{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={`${style.text} hover:opacity-70 transition-opacity flex-shrink-0`}
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
}