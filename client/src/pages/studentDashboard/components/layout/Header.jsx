import React from 'react';
import { Bell } from 'lucide-react';
import { DarkModeToggle } from '../common/DarkModeToggle';
import { SearchBar } from '../common/SearchBar';

export const Header = ({ user, onSearch, showSearch = true }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold">
          Welcome back, {user.name.split(' ')[0]}! 
          <span className="ml-2">🔥</span>
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Level {user.level} · {user.points} XP
        </p>
      </div>
      
      <div className="flex items-center gap-3 self-end md:self-auto">
        {showSearch && <SearchBar onSearch={onSearch} />}
        
        <button className="relative p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <DarkModeToggle />
      </div>
    </div>
  );
};