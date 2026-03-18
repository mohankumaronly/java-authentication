import React from 'react';
import * as Icons from 'lucide-react';

export const TabNavigation = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="overflow-x-auto pb-2 mb-4 -mx-4 px-4 scrollbar-hide">
      <div className="flex gap-2 min-w-max">
        {tabs.map((tab) => {
          const IconComponent = Icons[tab.icon];
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200
                ${activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm'
                }`}
            >
              <span className="flex items-center gap-1.5">
                <IconComponent className="w-4 h-4" />
                {tab.name}
                {tab.badge && (
                  <span className="ml-1 text-xs px-1.5 py-0.5 bg-red-500 text-white rounded-full">
                    {tab.badge}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};