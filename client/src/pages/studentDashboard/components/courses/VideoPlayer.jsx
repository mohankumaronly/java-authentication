import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Download, MessageCircle, Star, Bookmark } from 'lucide-react';
import { fadeInUp } from '../../utils/animations';

export const VideoPlayer = ({ video }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const navigate = useNavigate();
  
  const handlePlay = () => {
    // Navigate to video player page when play button is clicked
    navigate(`/course/${video.courseId}/video/${video.id}`);
  };
  
  const handleContinue = (e) => {
    e.preventDefault(); // Prevent event bubbling
    navigate(`/course/${video.courseId}/video/${video.id}`);
  };
  
  return (
    <motion.div 
      variants={fadeInUp}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
    >
      <VideoThumbnail 
        video={video}
        isBookmarked={isBookmarked}
        onPlay={handlePlay}
        onBookmark={() => setIsBookmarked(!isBookmarked)}
      />
      
      <VideoInfo video={video} />
      
      <ProgressBar progress={video.progress} />
      
      <VideoActions onContinue={handleContinue} />
    </motion.div>
  );
};

const VideoThumbnail = ({ video, isBookmarked, onPlay, onBookmark }) => {
  // Make the entire thumbnail clickable
  const handleThumbnailClick = (e) => {
    // Don't navigate if clicking on bookmark button
    if (e.target.closest('.bookmark-button')) {
      return;
    }
    onPlay();
  };
  
  return (
    <div 
      className="relative aspect-video bg-gray-900 cursor-pointer group/thumbnail"
      onClick={handleThumbnailClick}
    >
      <img 
        src={video.thumbnail} 
        alt={video.title}
        className="w-full h-full object-cover group-hover/thumbnail:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onPlay();
          }}
          className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover/thumbnail:opacity-100 transition-opacity duration-300"
        >
          <Play className="w-5 h-5 md:w-6 md:h-6 text-white ml-0.5" />
        </motion.button>
      </div>
      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
        {video.duration}
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onBookmark();
        }}
        className={`bookmark-button absolute top-2 right-2 p-1.5 rounded-lg backdrop-blur-sm transition-colors ${
          isBookmarked ? 'bg-purple-500 text-white' : 'bg-black/50 text-white hover:bg-black/70'
        }`}
      >
        <Bookmark className="w-3 h-3" fill={isBookmarked ? "currentColor" : "none"} />
      </button>
    </div>
  );
};

const VideoInfo = ({ video }) => (
  <div className="p-3">
    <div className="flex items-start justify-between mb-2">
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm md:text-base mb-0.5 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {video.title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{video.instructor}</p>
      </div>
      <div className="flex items-center gap-1 shrink-0 ml-2">
        <Star className="w-3 h-3 text-yellow-500 fill-current" />
        <span className="text-xs font-medium">{video.rating}</span>
      </div>
    </div>
  </div>
);

const ProgressBar = ({ progress }) => (
  <div className="px-3">
    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
      <span>Progress</span>
      <span>{progress}%</span>
    </div>
    <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1 }}
        className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
      />
    </div>
  </div>
);

const VideoActions = ({ onContinue }) => (
  <div className="flex items-center gap-1.5 p-3 pt-2 border-t border-gray-200 dark:border-gray-700">
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onContinue}
      className="flex-1 py-1.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-xs font-medium flex items-center justify-center gap-1"
    >
      <Play className="w-3 h-3" />
      <span className="hidden sm:inline">Continue</span>
    </motion.button>
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="p-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300"
      onClick={(e) => e.stopPropagation()}
    >
      <Download className="w-3 h-3" />
    </motion.button>
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="p-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300"
      onClick={(e) => e.stopPropagation()}
    >
      <MessageCircle className="w-3 h-3" />
    </motion.button>
  </div>
);