import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogOut, Loader2 } from 'lucide-react';
import * as Icons from 'lucide-react';
import { useAuth } from '../../../../context/AuthContext';
import { logout } from '../../../../services/auth/authApi';
import ConfirmDialog from '../common/ConfirmDialog';

export const MobileMenu = ({ isOpen, onClose, navigation, activeTab, setActiveTab, user, onLogout }) => {
  const { logout: authLogout } = useAuth();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      
      await logout(refreshToken);
      
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      
      if (authLogout) {
        authLogout();
      }
      
      setShowConfirmDialog(false);
      onClose(); // Close mobile menu
      
      if (onLogout) {
        onLogout();
      }
      
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      
      if (authLogout) {
        authLogout();
      }
      
      setShowConfirmDialog(false);
      onClose(); // Close mobile menu
      
      if (onLogout) {
        onLogout();
      }
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            />
            
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 z-50 shadow-2xl lg:hidden"
            >
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">L</span>
                    </div>
                    <span className="font-bold text-lg">LearnFlow</span>
                  </div>
                  <button 
                    onClick={onClose} 
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {/* User Profile - Updated to match Sidebar */}
                {user && (
                  <div className="mt-4 flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                    <img 
                      src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName || user.name)}&background=3b82f6&color=fff`} 
                      alt={user.fullName || user.name} 
                      className="w-10 h-10 rounded-full shrink-0" 
                    />
                    <div className="min-w-0">
                      <h4 className="font-semibold text-sm truncate">{user.fullName || user.name}</h4>
                      <p className="text-xs text-gray-500 capitalize">{user.role || 'Student'}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <nav className="p-4 space-y-2">
                {navigation.map((item) => {
                  const IconComponent = Icons[item.icon];
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        onClose();
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                        ${activeTab === item.id 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md' 
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span className="text-sm flex-1 text-left">{item.name}</span>
                      {item.badge && (
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          activeTab === item.id 
                            ? 'bg-white/20 text-white' 
                            : 'bg-red-500 text-white'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
                
                {/* Logout Button with loading state */}
                <button
                  onClick={() => setShowConfirmDialog(true)}
                  disabled={isLoggingOut}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 mt-8 text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoggingOut ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span className="text-sm">Logging out...</span>
                    </>
                  ) : (
                    <>
                      <LogOut className="w-5 h-5" />
                      <span className="text-sm">Logout</span>
                    </>
                  )}
                </button>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleLogout}
        isLoading={isLoggingOut}
        title="Confirm Logout"
        message="Are you sure you want to logout? You will need to login again to access your account."
        confirmText="Yes, Logout"
        cancelText="Cancel"
        confirmVariant="danger"
      />
    </>
  );
};