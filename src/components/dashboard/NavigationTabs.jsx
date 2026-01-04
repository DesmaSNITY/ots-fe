import React from 'react';
import { BookOpen, ClipboardCheck, FileText } from 'lucide-react';

export default function NavigationTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'questions', label: 'Questions', icon: BookOpen },
    { id: 'answers', label: 'Submissions', icon: ClipboardCheck },
    // { id: 'rules', label: 'Rules/SOP', icon: FileText }
  ];

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon size={18} />
                <span>{label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}