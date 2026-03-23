// components/common/ConfirmDialog.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Loader2 } from 'lucide-react';

const ConfirmDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  isLoading = false,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmVariant = "danger" // 'danger', 'primary', 'warning'
}) => {
  
  // Get button styles based on variant
  const getConfirmButtonStyles = () => {
    switch (confirmVariant) {
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 text-white';
      case 'warning':
        return 'bg-yellow-600 hover:bg-yellow-700 text-white';
      case 'primary':
        return 'bg-blue-600 hover:bg-blue-700 text-white';
      default:
        return 'bg-red-600 hover:bg-red-700 text-white';
    }
  };

  // Get icon based on variant
  const getIcon = () => {
    switch (confirmVariant) {
      case 'danger':
        return <LogOut className="w-6 h-6 text-red-600 dark:text-red-400" />;
      case 'warning':
        return (
          <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'primary':
        return (
          <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return <LogOut className="w-6 h-6 text-red-600 dark:text-red-400" />;
    }
  };

  // Get background color for icon container
  const getIconBgColor = () => {
    switch (confirmVariant) {
      case 'danger':
        return 'bg-red-100 dark:bg-red-900/20';
      case 'warning':
        return 'bg-yellow-100 dark:bg-yellow-900/20';
      case 'primary':
        return 'bg-blue-100 dark:bg-blue-900/20';
      default:
        return 'bg-red-100 dark:bg-red-900/20';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => !isLoading && onClose()}
          />
          
          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 m-4">
              <div className="flex items-center justify-center mb-4">
                <div className={`w-12 h-12 ${getIconBgColor()} rounded-full flex items-center justify-center`}>
                  {getIcon()}
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-center text-gray-900 dark:text-white mb-2">
                {title}
              </h3>
              
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-6">
                {message}
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {cancelText}
                </button>
                
                <button
                  onClick={onConfirm}
                  disabled={isLoading}
                  className={`flex-1 px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${getConfirmButtonStyles()}`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      {confirmVariant === 'danger' && <LogOut className="w-4 h-4" />}
                      <span>{confirmText}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfirmDialog;