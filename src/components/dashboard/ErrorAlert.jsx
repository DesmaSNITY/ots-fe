import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function ErrorAlert({ error }) {
  if (!error) return null;
  
  return (
    <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
      <AlertCircle className="text-yellow-600 flex-shrink-0" size={20} />
      <p className="text-sm text-yellow-800">{error}</p>
    </div>
  );
}