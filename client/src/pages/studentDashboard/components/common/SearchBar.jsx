import React from 'react';
import { Search } from 'lucide-react';

export const SearchBar = ({ 
  placeholder = 'Search...', 
  value, 
  onChange,
  className = '',
  mobile = false 
}) => {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${
          mobile 
            ? 'w-full pl-10 pr-4 py-2.5 text-sm' 
            : 'pl-10 pr-4 py-2 text-sm w-64'
        } border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500`}
      />
    </div>
  );
};