import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, Loader2 } from 'lucide-react';
import { SidebarNav } from './SidebarNav';
import { useAuth } from '../../../../context/AuthContext';
import { logout } from '../../../../services/auth/authApi';
import ConfirmDialog from '../common/ConfirmDialog';
// import ConfirmDialog from '../../../common/ConfirmDialog'; // Adjust path as needed

export const Sidebar = ({ 
  isOpen, 
  onToggle, 
  user, 
  navigation, 
  activeTab, 
  onTabChange,
  onLogout
}) => {
  const navigate = useNavigate();
  const { logout: authLogout, clearUserData } = useAuth();
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
      
      navigate('/login');
      
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
      navigate('/login');
      
      if (onLogout) {
        onLogout();
      }
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <aside 
        className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-800 shadow-xl z-40 hidden lg:block transition-all duration-300 ${
          isOpen ? 'w-64' : 'w-20'
        }`}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center px-4 border-b border-gray-200 dark:border-gray-700">
          {isOpen ? (
            <div className="flex items-center justify-between w-full">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-xl">L</span>
                </div>
                <span className="font-bold text-xl whitespace-nowrap">LearnFlow</span>
              </Link>
              <button
                onClick={onToggle}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-xl">L</span>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        {isOpen && user && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-4 border-b border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center gap-3">
              <img 
                src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName || user.name)}&background=3b82f6&color=fff`} 
                alt={user.fullName || user.name} 
                className="w-10 h-10 rounded-full shrink-0" 
              />
              <div className="min-w-0">
                <h4 className="font-semibold text-sm truncate">{user.fullName || user.name}</h4>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
            </div>
          </motion.div>
        )}

        <SidebarNav 
          navigation={navigation}
          activeTab={activeTab}
          onTabChange={onTabChange}
          isOpen={isOpen}
        />
        
        <button
          onClick={() => setShowConfirmDialog(true)}
          disabled={isLoggingOut}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 mt-8
            ${isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''}
            ${isOpen 
              ? 'text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600' 
              : 'text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 justify-center'
            }`}
        >
          {isLoggingOut ? (
            <>
              <Loader2 className="w-5 h-5 shrink-0 animate-spin" />
              {isOpen && <span className="text-sm">Logging out...</span>}
            </>
          ) : (
            <>
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              {isOpen && <span className="text-sm">Logout</span>}
            </>
          )}
        </button>
      </aside>

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