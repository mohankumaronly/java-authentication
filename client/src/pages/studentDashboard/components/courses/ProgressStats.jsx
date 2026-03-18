import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { fadeInUp } from '../../utils/animations';

export const ProgressStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((stat, idx) => {
        // Convert icon string to component (e.g., 'video' -> Video icon)
        const iconName = stat.icon.charAt(0).toUpperCase() + stat.icon.slice(1);
        const IconComponent = Icons[iconName] || Icons.HelpCircle;
        
        return (
          <motion.div
            key={idx}
            variants={fadeInUp}
            className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-lg text-center"
          >
            <div className={`w-8 h-8 mx-auto mb-1 rounded-lg flex items-center justify-center ${stat.color}`}>
              <IconComponent className="w-4 h-4" />
            </div>
            <div className="text-lg font-bold">{stat.value}</div>
            <div className="text-xs text-gray-500">{stat.label}</div>
          </motion.div>
        );
      })}
    </div>
  );
};