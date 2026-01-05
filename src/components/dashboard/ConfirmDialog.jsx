import React from "react";

export default function ConfirmDialog({
  show,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  type = "danger",
}) {
  if (!show) return null;

  const typeStyles = {
    danger: {
      icon: (
        <svg
          className="w-6 h-6 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      ),
      iconBg: "bg-red-100",
      button: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
    },
    warning: {
      icon: (
        <svg
          className="w-6 h-6 text-yellow-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      ),
      iconBg: "bg-yellow-100",
      button: "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500",
    },
  };

  const currentStyle = typeStyles[type];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className="relative bg-white rounded-xl shadow-2xl w-full max-w-md p-6 transform transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div
              className={`flex-shrink-0 ${currentStyle.iconBg} rounded-full p-3`}
            >
              {currentStyle.icon}
            </div>

            {/* Content */}
            <div className="flex-1 pt-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {title}
              </h3>
              <p className="text-sm text-gray-600 mb-6">{message}</p>

              {/* Actions */}
              <div className="flex gap-3 justify-end">
                <button
                  onClick={onCancel}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                >
                  {cancelText}
                </button>
                <button
                  onClick={onConfirm}
                  className={`px-4 py-2 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${currentStyle.button}`}
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
