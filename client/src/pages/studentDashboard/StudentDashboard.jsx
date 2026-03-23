import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, ChevronRight, Trophy } from 'lucide-react';

// Hooks
import { useResponsive } from './hooks/useResponsive';
import { useFilters } from './hooks/useFilters';

// Layout Components
import { Sidebar } from './components/layout/Sidebar';
import { MobileMenu } from './components/layout/MobileMenu';
import { Header } from './components/layout/Header';
import { TabNavigation } from './components/layout/TabNavigation';

// Course Components
import { CourseCard } from './components/courses/CourseCard';
import { VideoPlayer } from './components/courses/VideoPlayer';
import { ProgressStats } from './components/courses/ProgressStats';
import { CourseFilters } from './components/courses/CourseFilters';

// Other Components
import { CodingChallenge } from './components/coding/CodingChallenge';
import { CommunityPost } from './components/community/CommunityPost';
import { AIAssistant } from './components/ai/AIAssistant';

// Common Components
import { SearchBar } from './components/common/SearchBar';
import { ViewToggle } from './components/common/ViewToggle';

// Mock Data
import {
  mockUser,
  mockStats,
  mockCourses,
  mockChallenges,
  mockPosts,
  navigation,
  mockVideos // Import mockVideos
} from './data/mockData';

// Animations
import { fadeInUp } from './utils/animations';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const { isSidebarOpen, setIsSidebarOpen } = useResponsive();
  const { filters, filteredItems, updateFilter } = useFilters(mockCourses.exploreCourses);

  const handleEnroll = (course) => {
    // Navigate to course details page for enrollment
    navigate(`/course/${course.id}`);
  };

  const handleLogout = () => {
    navigate('/');
  };

  // Prepare courses with first video ID for quick access
  const coursesWithFirstVideo = mockCourses.myCourses.map(course => ({
    ...course,
    courseId: course.id,
    firstVideoId: mockVideos[course.id]?.playlist[0]?.id || course.id,
    videoCount: mockVideos[course.id]?.playlist.length || 0
  }));

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab
          myCourses={coursesWithFirstVideo}
          challenges={mockChallenges}
          posts={mockPosts}
        />;

      case 'courses':
        return <CoursesTab
          courses={coursesWithFirstVideo}
          viewMode={viewMode}
        />;

      case 'explore':
        return <ExploreTab
          courses={filteredItems}
          viewMode={viewMode}
          filters={filters}
          onFilterChange={updateFilter}
          onEnroll={handleEnroll}
        />;

      case 'coding':
        return <CodingTab challenges={mockChallenges} />;

      case 'ai':
        return <AITab />;

      case 'community':
        return <CommunityTab posts={mockPosts} />;

      case 'achievements':
        return <AchievementsTab />;

      case 'settings':
        return <SettingsTab user={mockUser} />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2.5 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navigation={navigation}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={mockUser}
        onLogout={handleLogout}
      />

      {/* Desktop Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        user={mockUser}
        navigation={navigation}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={handleLogout}
      />


      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed left-4 top-4 z-40 p-2.5 bg-white dark:bg-gray-800 rounded-xl shadow-lg hidden lg:block hover:shadow-xl transition-all"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}

      {/* Main Content */}
      <main className={`transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
        } p-4 md:p-6 lg:p-8 pt-20 lg:pt-8`}>

        <Header user={mockUser} onSearch={setSearchQuery} />

        {/* Mobile Search */}
        <div className="md:hidden mb-4">
          <SearchBar mobile placeholder="Search courses, challenges..." />
        </div>

        {/* Progress Stats */}
        <ProgressStats stats={mockStats} />

        {/* Main Content Area */}
        <div className="mt-6">
          <TabNavigation
            tabs={navigation}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* View Toggle for relevant tabs */}
          {(activeTab === 'courses' || activeTab === 'explore') && (
            <div className="flex justify-end mb-4">
              <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
            </div>
          )}

          {/* Dynamic Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

// Tab Components
const DashboardTab = ({ myCourses, challenges, posts }) => {
  const navigate = useNavigate();

  const handleVideoClick = (courseId, videoId) => {
    navigate(`/course/${courseId}/video/${videoId}`);
  };

  return (
    <div className="space-y-6">
      <section>
        <SectionHeader title="Continue Watching" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {myCourses.slice(0, 4).map((course, idx) => (
            <div 
              key={idx}
              onClick={() => handleVideoClick(course.courseId, course.firstVideoId)}
              className="cursor-pointer"
            >
              <VideoPlayer
                video={{
                  ...course,
                  id: course.firstVideoId // Use the first video ID for quick access
                }}
              />
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="Recommended Challenges" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {challenges.map((challenge, idx) => (
            <CodingChallenge key={idx} challenge={challenge} />
          ))}
        </div>
      </section>

      <div className="grid lg:grid-cols-2 gap-6">
        <AIAssistant />

        <div>
          <SectionHeader title="Community Feed" />
          <div className="space-y-4">
            {posts.map((post, idx) => (
              <CommunityPost key={idx} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CoursesTab = ({ courses, viewMode }) => {
  const navigate = useNavigate();

  const handleVideoClick = (courseId, videoId) => {
    navigate(`/course/${courseId}/video/${videoId}`);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">My Courses</h2>
      <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-4`}>
        {courses.map((course, idx) => (
          <div 
            key={idx}
            onClick={() => handleVideoClick(course.courseId, course.firstVideoId)}
            className="cursor-pointer"
          >
            <VideoPlayer
              video={{
                ...course,
                id: course.firstVideoId // Use the first video ID
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const ExploreTab = ({ courses, viewMode, filters, onFilterChange, onEnroll }) => {
  const navigate = useNavigate();

  const handleCourseClick = (courseId) => {
    // Navigate to course details page
    navigate(`/course/${courseId}`);
  };

  const handleEnrollClick = (e, course) => {
    e.stopPropagation(); // Prevent navigation to course details when clicking enroll
    onEnroll(course);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-lg font-semibold">Explore Courses</h2>
        <CourseFilters filters={filters} onFilterChange={onFilterChange} />
      </div>

      <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
        {courses.map((course, idx) => (
          <div
            key={idx}
            onClick={() => handleCourseClick(course.id)}
            className="cursor-pointer transition-transform hover:scale-105"
          >
            <CourseCard
              course={course}
              onEnroll={(e) => handleEnrollClick(e, course)}
            />
          </div>
        ))}
      </div>

      {courses.length === 0 && (
        <EmptyState message="No courses match your filters" />
      )}
    </div>
  );
};

const CodingTab = ({ challenges }) => (
  <div>
    <h2 className="text-lg font-semibold mb-4">Coding Challenges</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {challenges.map((challenge, idx) => (
        <CodingChallenge key={idx} challenge={challenge} />
      ))}
    </div>
  </div>
);

const AITab = () => (
  <div className="max-w-3xl mx-auto">
    <AIAssistant />
  </div>
);

const CommunityTab = ({ posts }) => (
  <div>
    <h2 className="text-lg font-semibold mb-4">Community</h2>
    <div className="space-y-4">
      {posts.map((post, idx) => (
        <CommunityPost key={idx} post={post} />
      ))}
    </div>
  </div>
);

const AchievementsTab = () => (
  <div>
    <h2 className="text-lg font-semibold mb-4">Achievements</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <AchievementCard key={i} index={i} />
      ))}
    </div>
  </div>
);

const SettingsTab = ({ user }) => (
  <div className="max-w-2xl mx-auto">
    <h2 className="text-lg font-semibold mb-4">Settings</h2>
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Name</label>
        <input
          type="text"
          defaultValue={user.name}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          defaultValue={user.email}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"
        />
      </div>
      <button className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium">
        Save Changes
      </button>
    </div>
  </div>
);

// Helper Components
const SectionHeader = ({ title }) => (
  <div className="flex items-center justify-between mb-3">
    <h2 className="text-lg font-semibold">{title}</h2>
    <button className="text-sm text-blue-600 flex items-center gap-0.5">
      View All <ChevronRight className="w-4 h-4" />
    </button>
  </div>
);

const AchievementCard = ({ index }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center shadow-lg">
    <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
    <h3 className="font-semibold text-sm">Achievement {index}</h3>
    <p className="text-xs text-gray-500">Description here</p>
  </div>
);

const EmptyState = ({ message }) => (
  <div className="text-center py-12">
    <p className="text-gray-500">{message}</p>
  </div>
);

export default StudentDashboard;