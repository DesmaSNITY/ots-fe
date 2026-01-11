import React from 'react';
import { BookOpen, ClipboardCheck, FileText, MessageSquare } from 'lucide-react';

export default function NavigationTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'questions', label: 'Questions', icon: BookOpen, color: 'blue' },
    { id: 'answers', label: 'Submissions', icon: ClipboardCheck, color: 'green' },
    { id: 'rules', label: 'Rules/SOP', icon: FileText, color: 'purple' },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare, color: 'orange' }
  ];

  const getTabStyles = (tab, isActive) => {
    const colors = {
      blue: isActive 
        ? 'border-blue-500 text-blue-600 bg-blue-50' 
        : 'border-transparent text-gray-500 hover:text-blue-600 hover:bg-blue-50',
      green: isActive 
        ? 'border-green-500 text-green-600 bg-green-50' 
        : 'border-transparent text-gray-500 hover:text-green-600 hover:bg-green-50',
      purple: isActive 
        ? 'border-purple-500 text-purple-600 bg-purple-50' 
        : 'border-transparent text-gray-500 hover:text-purple-600 hover:bg-purple-50',
      orange: isActive 
        ? 'border-orange-500 text-orange-600 bg-orange-50' 
        : 'border-transparent text-gray-500 hover:text-orange-600 hover:bg-orange-50'
    };
    
    return colors[tab.color];
  };

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-4 border-b-2 font-medium text-sm transition-all ${
                getTabStyles(tab, activeTab === tab.id)
              }`}
            >
              <div className="flex items-center gap-2">
                <tab.icon size={18} />
                <span>{tab.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}