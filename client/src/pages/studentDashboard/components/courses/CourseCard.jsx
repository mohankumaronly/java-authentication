import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { fadeInUp } from '../../utils/animations';

export const CourseCard = ({ course, onEnroll }) => {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800">
        <img 
          src={course.thumbnail} 
          alt={course.title}
          className="w-full h-full object-cover"
        />
        {course.isNew && (
          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
            NEW
          </div>
        )}
        {course.isPopular && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
            🔥 POPULAR
          </div>
        )}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-lg">
          {course.duration}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-base line-clamp-1">{course.title}</h3>
          <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-0.5 rounded shrink-0">
            <Star className="w-3 h-3 text-yellow-500 fill-current" />
            <span className="text-xs font-semibold">{course.rating}</span>
          </div>
        </div>
        
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{course.instructor}</p>
        <p className="text-xs text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{course.description}</p>
        
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">{course.level}</span>
          <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">{course.lessons} lessons</span>
        </div>
        
        <div className="flex items-center justify-between">
          <PriceDisplay course={course} />
          <EnrollButton onEnroll={() => onEnroll(course)} />
        </div>
      </div>
    </motion.div>
  );
};

const PriceDisplay = ({ course }) => {
  if (course.isFree) {
    return <span className="text-green-600 dark:text-green-400 font-bold">Free</span>;
  }
  
  return (
    <div>
      <span className="font-bold text-lg">${course.price}</span>
      {course.originalPrice && (
        <span className="text-xs text-gray-400 line-through ml-2">${course.originalPrice}</span>
      )}
    </div>
  );
};

const EnrollButton = ({ onEnroll }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onEnroll}
    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all"
  >
    Enroll Now
  </motion.button>
);