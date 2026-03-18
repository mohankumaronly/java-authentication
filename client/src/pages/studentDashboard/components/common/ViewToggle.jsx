import React from 'react';
import { Grid, List } from 'lucide-react';

export const ViewToggle = ({ viewMode, onViewChange }) => {
  return (
    <div className="flex gap-2 bg-white dark:bg-gray-800 p-1 rounded-lg shadow-sm">
      <button
        onClick={() => onViewChange('grid')}
        className={`p-2 rounded-md transition-colors ${
          viewMode === 'grid' ? 'bg-gray-200 dark:bg-gray-700' : ''
        }`}
      >
        <Grid className="w-4 h-4" />
      </button>
      <button
        onClick={() => onViewChange('list')}
        className={`p-2 rounded-md transition-colors ${
          viewMode === 'list' ? 'bg-gray-200 dark:bg-gray-700' : ''
        }`}
      >
        <List className="w-4 h-4" />
      </button>
    </div>
  );
};