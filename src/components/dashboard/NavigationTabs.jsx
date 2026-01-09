import React from 'react';
import { BookOpen, ClipboardCheck, FileText } from 'lucide-react';

export default function NavigationTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'questions', label: 'Questions', icon: BookOpen, gradient: 'from-blue-500 to-indigo-600' },
    { id: 'answers', label: 'Submissions', icon: ClipboardCheck, gradient: 'from-green-500 to-emerald-600' },
    { id: 'rules', label: 'Rules/SOP', icon: FileText, gradient: 'from-purple-500 to-pink-600' }
  ];
  
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative py-4 px-6 font-medium text-sm transition-all duration-300 ${
                  isActive 
                    ? 'text-gray-900' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2.5 relative z-10">
                  <tab.icon size={18} className={isActive ? 'animate-bounce-subtle' : ''} />
                  <span className="font-semibold">{tab.label}</span>
                </div>
                
                {/* Active indicator with gradient */}
                {isActive && (
                  <>
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${tab.gradient} rounded-t-full`} />
                    <div className={`absolute inset-0 bg-gradient-to-r ${tab.gradient} opacity-5 rounded-t-lg`} />
                  </>
                )}
                
                {/* Hover effect */}
                {!isActive && (
                  <div className="absolute inset-0 bg-gray-100 opacity-0 hover:opacity-100 transition-opacity rounded-t-lg" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}