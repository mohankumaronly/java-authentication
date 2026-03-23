import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Pause, Volume2, VolumeX, Maximize, Minimize,
  ChevronLeft, ThumbsUp, Share2, Bookmark, Clock,
  User, ChevronRight, Heart, MessageCircle, Repeat, Check,
  X, MoreHorizontal
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
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const videoRef = useRef(null);
  const iframeRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

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
          subscribers: "7.47M",
          subscriberCount: 7470000
        },
        // YouTube embed URL for the DSA lecture
        videoUrl: "https://www.youtube.com/embed/VTLCoHnyACE",
        isYouTube: true,
        duration: "1:15:30",
        views: "5.68M",
        likes: 86000,
        publishedAt: "2024-09-02",
        comments: 12000,
        tags: ["c++", "dsa", "flowchart", "pseudocode", "programming", "apnacollege"]
      };
      setVideo(mockVideo);
    };

    // Mock recommended courses (other lectures from the playlist)
    const recommended = [
      {
        id: 102,
        title: "Lecture 2 : Variable, Data Types & Operators",
        instructor: "Shradha Khapra",
        thumbnail: "https://img.youtube.com/vi/VIDEO_ID_2/mqdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/NEXT_VIDEO_ID",
        isYouTube: true,
        duration: "1:20:15",
        views: "4.2M",
        publishedAt: "1 week ago",
        isFree: true,
        rating: 4.9
      },
      {
        id: 103,
        title: "Lecture 3: Conditional Statements & Loops",
        instructor: "Shradha Khapra",
        thumbnail: "https://img.youtube.com/vi/VIDEO_ID_3/mqdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/VIDEO_ID_3",
        isYouTube: true,
        duration: "1:25:30",
        views: "3.8M",
        publishedAt: "2 weeks ago",
        isFree: true,
        rating: 4.8
      },
      {
        id: 104,
        title: "Lecture 4: Patterns in C++",
        instructor: "Shradha Khapra",
        thumbnail: "https://img.youtube.com/vi/VIDEO_ID_4/mqdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/VIDEO_ID_4",
        isYouTube: true,
        duration: "1:30:15",
        views: "3.2M",
        publishedAt: "3 weeks ago",
        isFree: true,
        rating: 4.9
      },
      {
        id: 105,
        title: "Lecture 5: Functions in C++",
        instructor: "Shradha Khapra",
        thumbnail: "https://img.youtube.com/vi/VIDEO_ID_5/mqdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/VIDEO_ID_5",
        isYouTube: true,
        duration: "1:15:40",
        views: "2.9M",
        publishedAt: "1 month ago",
        isFree: true,
        rating: 4.8
      },
      {
        id: 106,
        title: "Binary Number System | DSA Series",
        instructor: "Shradha Khapra",
        thumbnail: "https://img.youtube.com/vi/VIDEO_ID_6/mqdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/VIDEO_ID_6",
        isYouTube: true,
        duration: "1:10:20",
        views: "2.5M",
        publishedAt: "1 month ago",
        isFree: true,
        rating: 4.7
      },
      {
        id: 107,
        title: "Bitwise Operators | DSA Series",
        instructor: "Shradha Khapra",
        thumbnail: "https://img.youtube.com/vi/VIDEO_ID_7/mqdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/VIDEO_ID_7",
        isYouTube: true,
        duration: "1:25:15",
        views: "2.1M",
        publishedAt: "1 month ago",
        isFree: true,
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
    if (!video?.isYouTube && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (!video?.isYouTube && videoRef.current) {
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
    if (!video?.isYouTube && videoRef.current) {
      const progressBar = e.currentTarget;
      const clickPosition = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
      const newTime = clickPosition * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      setProgress(clickPosition * 100);
    }
  };

  const changePlaybackRate = () => {
    if (!video?.isYouTube && videoRef.current) {
      const rates = [0.5, 0.75, 1, 1.25, 1.5, 2];
      const currentIndex = rates.indexOf(playbackRate);
      const nextRate = rates[(currentIndex + 1) % rates.length];
      setPlaybackRate(nextRate);
      videoRef.current.playbackRate = nextRate;
    }
  };

  const handleMouseMove = () => {
    if (!isFullscreen && !video?.isYouTube) {
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
    if (!video?.isYouTube && videoRef.current) {
      const current = videoRef.current.currentTime;
      const dur = videoRef.current.duration;
      setCurrentTime(current);
      setProgress((current / dur) * 100);
    }
  };

  useEffect(() => {
    return () => {
      if (!video?.isYouTube && videoRef.current && videoId) {
        localStorage.setItem(`video_progress_${videoId}`, videoRef.current.currentTime);
      }
    };
  }, [videoId, video]);

  useEffect(() => {
    if (!video?.isYouTube && videoRef.current && video) {
      const savedProgress = localStorage.getItem(`video_progress_${videoId}`);
      if (savedProgress) {
        videoRef.current.currentTime = parseFloat(savedProgress);
      }
    }
  }, [video, videoId]);

  const ShareModal = () => (
    <AnimatePresence>
      {showShareModal && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setShowShareModal(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 m-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Share Video</h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              <div className="space-y-3">
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setShowShareModal(false);
                  }}
                  className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Copy Link
                </button>
                <button className="w-full py-2 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors">
                  Share on Twitter
                </button>
                <button className="w-full py-2 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors">
                  Share on Facebook
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

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
      {/* Main Container - Video Player and Recommended Courses Side by Side */}
      {!isFullscreen ? (
        <div className="max-w-[1800px] mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Side - Video Player Section */}
            <div className="lg:flex-1 min-w-0">
              {/* Video Player */}
              <div
                className="relative bg-black rounded-xl overflow-hidden shadow-2xl"
                onMouseMove={handleMouseMove}
                onMouseLeave={() => !video?.isYouTube && setShowControls(false)}
              >
                {!video.isYouTube ? (
                  <video
                    ref={videoRef}
                    className="w-full aspect-video"
                    src={video.videoUrl}
                    onClick={togglePlay}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={(e) => setDuration(e.target.duration)}
                  />
                ) : (
                  <iframe
                    ref={iframeRef}
                    className="w-full aspect-video"
                    src={`${video.videoUrl}?autoplay=0&controls=1&modestbranding=1&rel=0&showinfo=0`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}

                {/* Video Controls Overlay - Only for non-YouTube videos */}
                {!video.isYouTube && (
                  <AnimatePresence>
                    {showControls && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/70"
                      >
                        {/* Top Controls */}
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

                        {/* Center Play Button */}
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

                        {/* Bottom Controls */}
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
                )}
              </div>

              {/* Video Info Section */}
              <div className="mt-4 space-y-4">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  {video.title}
                </h1>

                {/* Video Actions Bar */}
                <div className="flex items-center justify-between flex-wrap gap-4 border-b border-gray-200 dark:border-gray-700 pb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={video.instructor.avatar}
                      alt={video.instructor.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="text-gray-900 dark:text-white font-medium">{video.instructor.name}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">{video.instructor.subscribers} subscribers</p>
                    </div>
                    <button className="ml-2 px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-full text-sm font-medium transition-colors">
                      Subscribe
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-colors ${isLiked
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>{video.likes}</span>
                    </button>

                    <button
                      onClick={() => setShowShareModal(true)}
                      className="flex items-center gap-2 px-4 py-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-700 dark:text-gray-300"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </button>

                    <div className="relative">
                      <button
                        onClick={() => setShowMoreOptions(!showMoreOptions)}
                        className="p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                      >
                        <MoreHorizontal className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                      </button>

                      <AnimatePresence>
                        {showMoreOptions && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-10"
                          >
                            <button
                              onClick={() => {
                                setIsSaved(!isSaved);
                                setShowMoreOptions(false);
                              }}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              {isSaved ? 'Remove from saved' : 'Save to playlist'}
                            </button>
                            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                              Report
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Video Description */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <span>{video.views} views</span>
                    <span>{new Date(video.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {video.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {video.tags.map((tag, index) => (
                      <span key={index} className="text-xs text-blue-600 dark:text-blue-400">#{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Comments Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-gray-900 dark:text-white font-semibold">Comments</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{video.comments}</span>
                  </div>

                  <div className="flex gap-3">
                    <img
                      src="https://ui-avatars.com/api/?name=You&background=3b82f6&color=fff"
                      alt="You"
                      className="w-10 h-10 rounded-full"
                    />
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="flex-1 bg-transparent border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white py-2 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar - Recommended Courses (Fixed Width) */}
            <div className="lg:w-[400px] flex-shrink-0">
              <div className="sticky top-4 space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-900 dark:text-white font-semibold text-base">Recommended for you</h3>
                  <button className="text-blue-600 dark:text-blue-400 text-sm hover:text-blue-700">View All</button>
                </div>

                <div className="space-y-3 max-h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar">
                  {recommendedCourses.map((course) => (
                    <Link
                      key={course.id}
                      to={`/course/${course.id}/video/1`}
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
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{course.instructor}</p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
                          <span>{course.views} views</span>
                          <span>•</span>
                          <span>{course.publishedAt}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <div className="flex items-center gap-0.5">
                            <span className="text-yellow-500 text-xs">★</span>
                            <span className="text-xs text-gray-600 dark:text-gray-400">{course.rating}</span>
                          </div>
                          {!course.isFree && (
                            <span className="text-xs font-semibold text-gray-900 dark:text-white">
                              ${course.price}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Fullscreen Mode - Only Video Player
        <div className="fixed inset-0 bg-black z-50">
          <div className="relative w-full h-full bg-black">
            {!video.isYouTube ? (
              <video
                ref={videoRef}
                className="w-full h-full object-contain"
                src={video.videoUrl}
                onClick={togglePlay}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={(e) => setDuration(e.target.duration)}
              />
            ) : (
              <iframe
                ref={iframeRef}
                className="w-full h-full"
                src={`${video.videoUrl}?autoplay=1&controls=1&modestbranding=1&rel=0`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}

            {/* Back Button in Fullscreen */}
            <button
              onClick={() => toggleFullscreen()}
              className="absolute top-4 left-4 p-2 rounded-lg bg-black/50 hover:bg-black/70 transition-colors backdrop-blur-sm z-10"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Share Modal */}
      <ShareModal />
    </div>
  );
};

export default VideoPlayerPage;