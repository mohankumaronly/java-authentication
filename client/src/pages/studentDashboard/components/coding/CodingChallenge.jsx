import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Users, Clock } from 'lucide-react';
import { fadeInUp } from '../../utils/animations';

const difficultyColors = {
  Easy: "text-green-600 bg-green-100 dark:bg-green-900/30",
  Medium: "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30",
  Hard: "text-red-600 bg-red-100 dark:bg-red-900/30"
};

export const CodingChallenge = ({ challenge }) => {
  return (
    <motion.div 
      variants={fadeInUp}
      className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-lg hover:shadow-xl transition-all"
    >
      <div className="flex items-start gap-2">
        <ChallengeIcon difficulty={challenge.difficulty} />
        
        <div className="flex-1 min-w-0">
          <ChallengeHeader challenge={challenge} />
          <ChallengeStats challenge={challenge} />
        </div>
      </div>
      
      <StartButton />
    </motion.div>
  );
};

const ChallengeIcon = ({ difficulty }) => (
  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${difficultyColors[difficulty].split(' ')[1]}`}>
    <Terminal className={`w-4 h-4 ${difficultyColors[difficulty].split(' ')[0]}`} />
  </div>
);

const ChallengeHeader = ({ challenge }) => (
  <>
    <div className="flex items-start justify-between gap-1">
      <h3 className="font-semibold text-sm truncate">{challenge.title}</h3>
      <span className={`text-xs px-1.5 py-0.5 rounded-full whitespace-nowrap ${difficultyColors[challenge.difficulty]}`}>
        {challenge.difficulty}
      </span>
    </div>
    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{challenge.language}</p>
  </>
);

const ChallengeStats = ({ challenge }) => (
  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
    <span className="flex items-center gap-0.5">
      <Users className="w-3 h-3" />
      {challenge.completed}
    </span>
    <span className="flex items-center gap-0.5">
      <Clock className="w-3 h-3" />
      {challenge.timeLimit}
    </span>
  </div>
);

const StartButton = () => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="w-full mt-2 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-xs font-medium transition-colors"
  >
    Start Challenge
  </motion.button>
);