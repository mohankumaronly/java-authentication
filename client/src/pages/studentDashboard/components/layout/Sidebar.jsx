import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Menu } from 'lucide-react';
import { SidebarNav } from './SidebarNav';

export const Sidebar = ({ 
  isOpen, 
  onToggle, 
  user, 
  navigation, 
  activeTab, 
  onTabChange,
  onLogout 
}) => {
  return (
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
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="p-4 border-b border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center gap-3">
            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full shrink-0" />
            <div className="min-w-0">
              <h4 className="font-semibold text-sm truncate">{user.name}</h4>
              <p className="text-xs text-gray-500">Level {user.level}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <SidebarNav 
        navigation={navigation}
        activeTab={activeTab}
        onTabChange={onTabChange}
        isOpen={isOpen}
      />
      
      {/* Logout Button */}
      <button
        onClick={onLogout}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 mt-8
          ${isOpen 
            ? 'text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600' 
            : 'text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 justify-center'
          }`}
      >
        <LogOut className="w-5 h-5 shrink-0" />
        {isOpen && <span className="text-sm">Logout</span>}
      </button>
    </aside>
  );
};