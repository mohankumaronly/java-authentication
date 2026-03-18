import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageSquare, Share2 } from 'lucide-react';
import { fadeInUp } from '../../utils/animations';

export const CommunityPost = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  
  return (
    <motion.div 
      variants={fadeInUp}
      className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-lg"
    >
      <PostHeader post={post} />
      <PostContent post={post} />
      <PostStats post={post} isLiked={isLiked} />
      <PostActions isLiked={isLiked} onLike={() => setIsLiked(!isLiked)} />
    </motion.div>
  );
};

const PostHeader = ({ post }) => (
  <div className="flex items-center gap-2 mb-2">
    <img src={post.userAvatar} alt={post.userName} className="w-8 h-8 rounded-full" />
    <div>
      <h4 className="font-semibold text-sm">{post.userName}</h4>
      <p className="text-xs text-gray-500">{post.timeAgo}</p>
    </div>
  </div>
);

const PostContent = ({ post }) => (
  <>
    <p className="text-sm mb-2">{post.content}</p>
    {post.image && (
      <div className="rounded-lg overflow-hidden mb-2">
        <img src={post.image} alt="Post" className="w-full h-32 object-cover" />
      </div>
    )}
  </>
);

const PostStats = ({ post, isLiked }) => (
  <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
    <span className="flex items-center gap-1">
      <Heart className={`w-3 h-3 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
      {isLiked ? post.likes + 1 : post.likes}
    </span>
    <span className="flex items-center gap-1">
      <MessageSquare className="w-3 h-3" />
      {post.comments}
    </span>
  </div>
);

const PostActions = ({ isLiked, onLike }) => (
  <div className="flex items-center gap-1 pt-2 border-t border-gray-200 dark:border-gray-700">
    <button 
      onClick={onLike}
      className={`flex-1 py-1.5 text-xs rounded-lg transition-colors ${
        isLiked ? 'text-red-500' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
    >
      <Heart className={`w-3 h-3 inline mr-1 ${isLiked ? 'fill-current' : ''}`} />
      Like
    </button>
    <button className="flex-1 py-1.5 text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
      <MessageSquare className="w-3 h-3 inline mr-1" />
      Comment
    </button>
    <button className="flex-1 py-1.5 text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
      <Share2 className="w-3 h-3 inline mr-1" />
      Share
    </button>
  </div>
);