import React from 'react';
import { X } from 'lucide-react';

export default function Modal({ show, title, onClose, children }) {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto animate-modal-fade-in">
      {/* Backdrop with blur effect */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal content */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div 
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl transform transition-all animate-modal-slide-up overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Gradient accent bar */}
          <div className="h-2 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600"></div>
          
          <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Body */}
            <div className="max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar px-2  ">
              {children}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');
        
        @keyframes modal-fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes modal-slide-up {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-modal-fade-in {
          animation: modal-fade-in 0.2s ease-out;
        }
        
        .animate-modal-slide-up {
          animation: modal-slide-up 0.3s ease-out;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #6366f1);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #4f46e5);
        }
      `}</style>
    </div>
  );
}