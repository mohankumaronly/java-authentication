import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

export const SidebarNav = ({ navigation, activeTab, onTabChange, isOpen }) => {
  return (
    <nav className="p-4 space-y-2">
      {navigation.map((item) => {
        const IconComponent = Icons[item.icon];
        
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
              ${activeTab === item.id 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
          >
            <IconComponent className={`w-5 h-5 shrink-0 ${!isOpen && 'mx-auto'}`} />
            {isOpen && (
              <>
                <span className="text-sm flex-1 text-left">{item.name}</span>
                {item.badge && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-xs px-2 py-0.5 bg-red-500 text-white rounded-full shrink-0"
                  >
                    {item.badge}
                  </motion.span>
                )}
              </>
            )}
          </button>
        );
      })}
    </nav>
  );
};