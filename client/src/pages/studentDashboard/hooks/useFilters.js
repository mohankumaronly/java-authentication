import { useState, useMemo } from 'react';

export const useFilters = (items, filterConfig = {}) => {
  const [filters, setFilters] = useState({
    category: 'all',
    price: 'all',
    level: 'all',
    ...filterConfig
  });

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      if (filters.category !== 'all' && item.level?.toLowerCase() !== filters.category) return false;
      if (filters.price === 'free' && !item.isFree) return false;
      if (filters.price === 'paid' && item.isFree) return false;
      if (filters.level !== 'all' && item.difficulty !== filters.level) return false;
      return true;
    });
  }, [items, filters]);

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return { filters, filteredItems, updateFilter };
};