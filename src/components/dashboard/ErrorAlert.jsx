import React from 'react';
import { AlertCircle, X } from 'lucide-react';

export default function ErrorAlert({ error, onClose }) {
  if (!error) return null;
  
  return (
    <div className="mb-6 animate-slide-down">
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center shadow-lg shadow-yellow-500/30">
              <AlertCircle className="text-white" size={20} />
            </div>
          </div>
          <div className="flex-1 pt-1">
            <h3 className="text-sm font-bold text-yellow-900 mb-1">Attention Required</h3>
            <p className="text-sm text-yellow-800 leading-relaxed">{error}</p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="flex-shrink-0 p-1.5 text-yellow-600 hover:text-yellow-800 hover:bg-yellow-100 rounded-lg transition-all duration-300"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}