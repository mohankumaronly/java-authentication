import React from 'react';

export const CourseFilters = ({ filters, onFilterChange }) => {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 sm:pb-0">
      <select 
        value={filters.category}
        onChange={(e) => onFilterChange('category', e.target.value)}
        className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
      >
        <option value="all">All Levels</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>
      
      <select 
        value={filters.price}
        onChange={(e) => onFilterChange('price', e.target.value)}
        className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
      >
        <option value="all">All Prices</option>
        <option value="free">Free</option>
        <option value="paid">Paid</option>
      </select>
    </div>
  );
};