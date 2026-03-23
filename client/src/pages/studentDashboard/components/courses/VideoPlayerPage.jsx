import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Pause, Volume2, VolumeX, Maximize, Minimize,
  ChevronLeft, User, ChevronRight, Check, X, ShoppingCart, BookOpen,
  Star, MessageSquare, Send, ThumbsUp, ThumbsDown, AlertCircle
} from 'lucide-react';
import { useDarkMode } from '../../hooks/useDarkMode';

const VideoPlayerPage = () => {
  const { courseId, videoId } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const [video, setVideo] = useState(null);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const videoRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  
  // Rating and Feedback States
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [isRatingSubmitted, setIsRatingSubmitted] = useState(false);
  const [feedbackType, setFeedbackType] = useState(null); // 'helpful', 'not-helpful', or null
  const [showThankYou, setShowThankYou] = useState(false);
  const [thankYouMessage, setThankYouMessage] = useState('');

  // Listen for fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Mock video data and recommended courses
  useEffect(() => {
    const fetchVideo = async () => {
      const mockVideo = {
        id: videoId,
        title: "Lecture 1 : Flowchart & Pseudocode + Installation | DSA Series by Shradha Khapra Ma'am | C++",
        description: "Complete C++ DSA Course - Lecture 1 covering Flowchart, Pseudocode, and Installation setup for C++ programming. Perfect for beginners starting with Data Structures & Algorithms. In this video, we'll learn:\n\n• What are Flowcharts and how to create them\n• Understanding Pseudocode\n• Setting up C++ development environment\n• First program in C++\n\nThis is the first lecture of our complete DSA series. Follow along to build strong fundamentals!",
        instructor: {
          name: "Shradha Khapra",
          avatar: "https://ui-avatars.com/api/?name=Shradha+Khapra&background=3b82f6&color=fff",
        },
        videoUrl: "https://res.cloudinary.com/demo/video/upload/sample.mp4",
        isCloudinary: true,
        duration: "1:15:30",
        publishedAt: "2024-09-02",
        tags: ["c++", "dsa", "flowchart", "pseudocode", "programming", "apnacollege"],
        rating: 4.8,
        totalRatings: 1245
      };
      setVideo(mockVideo);
    };

    const recommended = [
      {
        id: 102,
        title: "Lecture 2 : Variable, Data Types & Operators",
        instructor: "Shradha Khapra",
        instructorAvatar: "https://ui-avatars.com/api/?name=Shradha+Khapra&background=3b82f6&color=fff",
        thumbnail: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
        videoUrl: "https://res.cloudinary.com/demo/video/upload/sample.mp4",
        isCloudinary: true,
        duration: "1:20:15",
        publishedAt: "1 week ago",
        isFree: true,
        price: 0,
        rating: 4.9
      },
      {
        id: 103,
        title: "Lecture 3: Conditional Statements & Loops",
        instructor: "Shradha Khapra",
        instructorAvatar: "https://ui-avatars.com/api/?name=Shradha+Khapra&background=3b82f6&color=fff",
        thumbnail: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
        videoUrl: "https://res.cloudinary.com/demo/video/upload/sample.mp4",
        isCloudinary: true,
        duration: "1:25:30",
        publishedAt: "2 weeks ago",
        isFree: false,
        price: 49.99,
        rating: 4.8
      },
      {
        id: 104,
        title: "Lecture 4: Patterns in C++",
        instructor: "Shradha Khapra",
        instructorAvatar: "https://ui-avatars.com/api/?name=Shradha+Khapra&background=3b82f6&color=fff",
        thumbnail: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
        videoUrl: "https://res.cloudinary.com/demo/video/upload/sample.mp4",
        isCloudinary: true,
        duration: "1:30:15",
        publishedAt: "3 weeks ago",
        isFree: false,
        price: 49.99,
        rating: 4.9
      },
      {
        id: 105,
        title: "Lecture 5: Functions in C++",
        instructor: "Shradha Khapra",
        instructorAvatar: "https://ui-avatars.com/api/?name=Shradha+Khapra&background=3b82f6&color=fff",
        thumbnail: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
        videoUrl: "https://res.cloudinary.com/demo/video/upload/sample.mp4",
        isCloudinary: true,
        duration: "1:15:40",
        publishedAt: "1 month ago",
        isFree: true,
        price: 0,
        rating: 4.8
      }
    ];

    setRecommendedCourses(recommended);
    fetchVideo();
  }, [courseId, videoId]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleProgressClick = (e) => {
    if (videoRef.current) {
      const progressBar = e.currentTarget;
      const clickPosition = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
      const newTime = clickPosition * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      setProgress(clickPosition * 100);
    }
  };

  const changePlaybackRate = () => {
    if (videoRef.current) {
      const rates = [0.5, 0.75, 1, 1.25, 1.5, 2];
      const currentIndex = rates.indexOf(playbackRate);
      const nextRate = rates[(currentIndex + 1) % rates.length];
      setPlaybackRate(nextRate);
      videoRef.current.playbackRate = nextRate;
    }
  };

  const handleMouseMove = () => {
    if (!isFullscreen) {
      setShowControls(true);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const dur = videoRef.current.duration;
      setCurrentTime(current);
      setProgress((current / dur) * 100);
    }
  };

  useEffect(() => {
    return () => {
      if (videoRef.current && videoId) {
        localStorage.setItem(`video_progress_${videoId}`, videoRef.current.currentTime);
      }
    };
  }, [videoId]);

  useEffect(() => {
    if (videoRef.current && video) {
      const savedProgress = localStorage.getItem(`video_progress_${videoId}`);
      if (savedProgress) {
        videoRef.current.currentTime = parseFloat(savedProgress);
      }
    }
  }, [video, videoId]);

  // Rating Handlers
  const handleRating = (value) => {
    setRating(value);
  };

  const submitRating = () => {
    if (rating > 0) {
      setIsRatingSubmitted(true);
      setThankYouMessage(`Thank you for rating this lecture ${rating} stars!`);
      setShowThankYou(true);
      setTimeout(() => setShowThankYou(false), 3000);
      // Here you would send the rating to your backend
      console.log(`Rating submitted: ${rating} stars for video ${videoId}`);
    }
  };

  const submitFeedback = () => {
    if (feedback.trim()) {
      const message = feedbackType === 'helpful' 
        ? 'Thank you for your positive feedback!' 
        : 'Thank you for helping us improve!';
      setThankYouMessage(message);
      setShowThankYou(true);
      setTimeout(() => setShowThankYou(false), 3000);
      // Here you would send the feedback to your backend
      console.log(`Feedback submitted for video ${videoId} (${feedbackType}): ${feedback}`);
      setFeedback('');
      setShowFeedbackForm(false);
      setFeedbackType(null);
    }
  };

  const handleFeedbackType = (type) => {
    if (feedbackType === type) {
      // If clicking the same button, close the form
      setShowFeedbackForm(false);
      setFeedbackType(null);
    } else {
      setFeedbackType(type);
      setShowFeedbackForm(true);
      setFeedback(''); // Clear previous feedback
      console.log(`User selected: ${type} for video ${videoId}`);
    }
  };

  const cancelFeedback = () => {
    setShowFeedbackForm(false);
    setFeedbackType(null);
    setFeedback('');
  };

  const handleEnrollOrPurchase = (e, course) => {
    e.stopPropagation();
    if (course.isFree) {
      console.log(`Enrolling in free course: ${course.title}`);
      alert(`You have been enrolled in "${course.title}" for free!`);
    } else {
      navigate(`/course/${course.id}`);
    }
  };

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  if (!video) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading video...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {!isFullscreen ? (
        <div className="max-w-[1800px] mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Side - Video Player Section */}
            <div className="lg:flex-1 min-w-0">
              {/* Video Player */}
              <div
                className="relative bg-black rounded-xl overflow-hidden shadow-2xl"
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setShowControls(false)}
              >
                <video
                  ref={videoRef}
                  className="w-full aspect-video"
                  src={video.videoUrl}
                  onClick={togglePlay}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={(e) => setDuration(e.target.duration)}
                />

                <AnimatePresence>
                  {showControls && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/70"
                    >
                      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start">
                        <button
                          onClick={() => navigate(-1)}
                          className="p-2 rounded-lg bg-black/50 hover:bg-black/70 transition-colors backdrop-blur-sm"
                        >
                          <ChevronLeft className="w-6 h-6 text-white" />
                        </button>
                        <h3 className="text-white text-sm md:text-base font-medium bg-black/50 px-3 py-1.5 rounded-lg max-w-md truncate backdrop-blur-sm">
                          {video.title}
                        </h3>
                      </div>

                      <button
                        onClick={togglePlay}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm"
                      >
                        {isPlaying ? (
                          <Pause className="w-12 h-12 text-white" />
                        ) : (
                          <Play className="w-12 h-12 text-white" />
                        )}
                      </button>

                      <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                        <div
                          className="w-full h-1 bg-gray-600 rounded-full cursor-pointer group"
                          onClick={handleProgressClick}
                        >
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full relative"
                            style={{ width: `${progress}%` }}
                          >
                            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button onClick={togglePlay} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                              {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
                            </button>
                            <button onClick={toggleMute} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                              {isMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
                            </button>
                            <div className="text-white text-sm">{formatTime(currentTime)} / {formatTime(duration)}</div>
                            <button onClick={changePlaybackRate} className="px-2 py-1 hover:bg-white/20 rounded-lg transition-colors text-white text-sm font-medium">
                              {playbackRate}x
                            </button>
                          </div>
                          <button onClick={toggleFullscreen} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                            <Maximize className="w-5 h-5 text-white" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Video Info Section */}
              <div className="mt-4 space-y-4">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  {video.title}
                </h1>

                {/* Instructor Info */}
                <div className="flex items-center gap-3 pb-4">
                  <img
                    src={video.instructor.avatar}
                    alt={video.instructor.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="text-gray-900 dark:text-white font-medium text-lg">{video.instructor.name}</p>
                  </div>
                </div>

                {/* Video Description */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {video.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {video.tags.map((tag, index) => (
                      <span key={index} className="text-xs text-blue-600 dark:text-blue-400">#{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Rating and Feedback Section */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Rate this lecture
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Star className="w-4 h-4 fill-current text-yellow-500" />
                      <span>{video.rating} ({video.totalRatings} ratings)</span>
                    </div>
                  </div>

                  {!isRatingSubmitted ? (
                    <>
                      {/* Star Rating */}
                      <div className="flex items-center gap-2 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => handleRating(star)}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            className="focus:outline-none transition-transform hover:scale-110"
                          >
                            <Star
                              className={`w-8 h-8 ${
                                star <= (hoveredRating || rating)
                                  ? 'fill-current text-yellow-500'
                                  : 'text-gray-300 dark:text-gray-600'
                              }`}
                            />
                          </button>
                        ))}
                        {rating > 0 && (
                          <button
                            onClick={submitRating}
                            className="ml-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                          >
                            Submit Rating
                          </button>
                        )}
                      </div>

                      {/* Feedback Buttons */}
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          Share your feedback about this lecture:
                        </p>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleFeedbackType('helpful')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                              feedbackType === 'helpful'
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-2 border-green-500 shadow-md'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                          >
                            <ThumbsUp className="w-4 h-4" />
                            <span>Helpful</span>
                          </button>
                          <button
                            onClick={() => handleFeedbackType('not-helpful')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                              feedbackType === 'not-helpful'
                                ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-2 border-red-500 shadow-md'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                          >
                            <ThumbsDown className="w-4 h-4" />
                            <span>Not Helpful</span>
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 mb-2">
                        <Check className="w-6 h-6" />
                        <span className="font-medium">Thank you for your rating!</span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Your feedback helps us improve the course content.
                      </p>
                    </div>
                  )}

                  {/* Feedback Form - Shows for both Helpful and Not Helpful */}
                  <AnimatePresence>
                    {showFeedbackForm && feedbackType && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: -20 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          {feedbackType === 'helpful' ? (
                            <ThumbsUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                          ) : (
                            <ThumbsDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                          )}
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {feedbackType === 'helpful' 
                              ? 'What did you find helpful? (Optional)' 
                              : 'What could be improved? (Optional)'}
                          </label>
                        </div>
                        
                        <div className="flex gap-2">
                          <textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder={
                              feedbackType === 'helpful'
                                ? "Tell us what you liked about this lecture..."
                                : "Please share your suggestions for improvement..."
                            }
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            rows="3"
                            autoFocus
                          />
                        </div>
                        
                        <div className="flex justify-end gap-2 mt-3">
                          <button
                            onClick={cancelFeedback}
                            className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={submitFeedback}
                            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors flex items-center gap-2"
                          >
                            <Send className="w-4 h-4" />
                            Submit Feedback
                          </button>
                        </div>
                        
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          Your feedback helps us create better content for everyone.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Right Sidebar - Recommended Courses */}
            <div className="lg:w-[400px] flex-shrink-0">
              <div className="sticky top-4 space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-900 dark:text-white font-semibold text-base">Recommended for you</h3>
                  <button className="text-blue-600 dark:text-blue-400 text-sm hover:text-blue-700">View All</button>
                </div>

                <div className="space-y-3 max-h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar">
                  {recommendedCourses.map((course) => (
                    <div
                      key={course.id}
                      onClick={() => handleCourseClick(course.id)}
                      className="flex gap-3 group cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-200 p-2"
                    >
                      <div className="relative flex-shrink-0 w-40 h-24">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 py-0.5 rounded">
                          {course.duration}
                        </div>
                        {course.isFree && (
                          <div className="absolute top-1 left-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                            FREE
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {course.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <img
                            src={course.instructorAvatar}
                            alt={course.instructor}
                            className="w-5 h-5 rounded-full"
                          />
                          <p className="text-xs text-gray-500 dark:text-gray-400">{course.instructor}</p>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <div className="flex items-center gap-0.5">
                            <span className="text-yellow-500 text-xs">★</span>
                            <span className="text-xs text-gray-600 dark:text-gray-400">{course.rating}</span>
                          </div>
                        </div>
                        
                        <button
                          onClick={(e) => handleEnrollOrPurchase(e, course)}
                          className="mt-2 w-full px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                          style={{
                            backgroundColor: course.isFree ? '#10b981' : '#3b82f6',
                            color: 'white'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = course.isFree ? '#059669' : '#2563eb';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = course.isFree ? '#10b981' : '#3b82f6';
                          }}
                        >
                          {course.isFree ? (
                            <>
                              <BookOpen className="w-4 h-4" />
                              Enroll Now
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-4 h-4" />
                              Purchase - ${course.price}
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Fullscreen Mode
        <div className="fixed inset-0 bg-black z-50">
          <div className="relative w-full h-full bg-black">
            <video
              ref={videoRef}
              className="w-full h-full object-contain"
              src={video.videoUrl}
              onClick={togglePlay}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={(e) => setDuration(e.target.duration)}
            />

            <button
              onClick={() => toggleFullscreen()}
              className="absolute top-4 left-4 p-2 rounded-lg bg-black/50 hover:bg-black/70 transition-colors backdrop-blur-sm z-10"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Thank You Toast Notification */}
      <AnimatePresence>
        {showThankYou && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50"
          >
            <Check className="w-5 h-5" />
            <span className="font-medium">{thankYouMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoPlayerPage;