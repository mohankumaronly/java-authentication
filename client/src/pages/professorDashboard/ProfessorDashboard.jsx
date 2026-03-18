import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { 
  // Navigation Icons
  Home,
  Video,
  Code2,
  Users,
  Award,
  BookOpen,
  Settings,
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
  Bell,
  Search,
  BarChart3,
  FileText,
  PlusCircle,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  ChevronDown,
  Filter,
  Grid,
  List,
  MoreVertical,
  CheckCircle,
  Clock,
  TrendingUp,
  Star,
  MessageSquare,
  Mail,
  Calendar,
  DollarSign,
  Share2,
  Copy,
  ExternalLink
} from "lucide-react";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Dark Mode Toggle Component
const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark")
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      onClick={() => setDarkMode((prev) => !prev)}
    >
      {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </motion.button>
  );
};

// Course Card Component
const CourseCard = ({ course, onEdit, onDelete, onView }) => {
  return (
    <motion.div 
      variants={fadeInUp}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
    >
      {/* Course Thumbnail */}
      <div className="relative aspect-video bg-gradient-to-r from-blue-500 to-purple-600">
        {course.thumbnail ? (
          <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-white/50" />
          </div>
        )}
        
        {/* Status Badge */}
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium
          ${course.status === 'Published' ? 'bg-green-500 text-white' : 
            course.status === 'Draft' ? 'bg-yellow-500 text-white' : 
            'bg-gray-500 text-white'}`}
        >
          {course.status}
        </div>
      </div>
      
      {/* Course Info */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{course.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{course.description}</p>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center">
            <div className="text-sm font-bold">{course.students}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Students</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold">{course.lessons}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Lessons</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold">{course.rating}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Rating</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-600 dark:text-gray-400">Completion Rate</span>
            <span className="font-medium">{course.completionRate}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${course.completionRate}%` }}
              transition={{ duration: 1 }}
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
            />
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onView(course)}
            className="flex-1 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            View Details
          </button>
          <button
            onClick={() => onEdit(course)}
            className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(course)}
            className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Student Progress Card
const StudentProgressCard = ({ student }) => {
  return (
    <motion.div 
      variants={fadeInUp}
      className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg"
    >
      <div className="flex items-center gap-3">
        <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full" />
        <div className="flex-1">
          <h4 className="font-semibold text-sm">{student.name}</h4>
          <p className="text-xs text-gray-600 dark:text-gray-400">{student.course}</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full font-medium
          ${student.progress >= 75 ? 'bg-green-100 dark:bg-green-900/30 text-green-600' :
            student.progress >= 50 ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600' :
            'bg-red-100 dark:bg-red-900/30 text-red-600'}`}
        >
          {student.progress}%
        </span>
      </div>
      
      {/* Progress Bar */}
      <div className="mt-3">
        <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${student.progress}%` }}
            className={`h-full ${
              student.progress >= 75 ? 'bg-green-500' :
              student.progress >= 50 ? 'bg-yellow-500' :
              'bg-red-500'
            }`}
          />
        </div>
      </div>
      
      {/* Last Active */}
      <div className="mt-2 text-xs text-gray-500">
        Last active: {student.lastActive}
      </div>
    </motion.div>
  );
};

// Assessment Card
const AssessmentCard = ({ assessment, onEdit, onDelete, onView }) => {
  return (
    <motion.div 
      variants={fadeInUp}
      className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg"
    >
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-semibold">{assessment.title}</h4>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{assessment.course}</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full font-medium
          ${assessment.type === 'MCQ' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' :
            assessment.type === 'Coding' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600' :
            'bg-green-100 dark:bg-green-900/30 text-green-600'}`}
        >
          {assessment.type}
        </span>
      </div>
      
      <div className="flex items-center gap-4 mt-3 text-xs text-gray-600 dark:text-gray-400">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {assessment.duration}
        </span>
        <span className="flex items-center gap-1">
          <Users className="w-3 h-3" />
          {assessment.submissions} submissions
        </span>
        <span className="flex items-center gap-1">
          <CheckCircle className="w-3 h-3" />
          Avg: {assessment.averageScore}%
        </span>
      </div>
      
      <div className="flex items-center gap-2 mt-4">
        <button
          onClick={() => onView(assessment)}
          className="flex-1 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          View Results
        </button>
        <button
          onClick={() => onEdit(assessment)}
          className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(assessment)}
          className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-red-600"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

// Analytics Chart Component (Simplified)
const AnalyticsChart = ({ data, title }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <h3 className="font-semibold mb-4">{title}</h3>
      <div className="space-y-3">
        {data.map((item, idx) => (
          <div key={idx}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
              <span className="font-medium">{item.value}</span>
            </div>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${item.percentage}%` }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Professor Dashboard Component
const ProfessorDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  
  // Filter states
  const [courseStatusFilter, setCourseStatusFilter] = useState('');
  const [courseSortFilter, setCourseSortFilter] = useState('');
  const [studentCourseFilter, setStudentCourseFilter] = useState('');
  const [studentProgressFilter, setStudentProgressFilter] = useState('');
  const [studentSearchQuery, setStudentSearchQuery] = useState('');
  const [assessmentTypeFilter, setAssessmentTypeFilter] = useState('');
  const [assessmentCourseFilter, setAssessmentCourseFilter] = useState('');
  
  const navigate = useNavigate();

  // Mock Data
  const professor = {
    name: "Dr. Emily Roberts",
    title: "Computer Science Professor",
    avatar: "/api/placeholder/40/40",
    institution: "Stanford University",
    totalStudents: 1243,
    totalCourses: 8,
    totalRevenue: 45230,
    rating: 4.8
  };

  const courses = [
    {
      id: 1,
      title: "Advanced React Development",
      description: "Master React with hooks, context, and advanced patterns",
      thumbnail: null,
      status: "Published",
      students: 342,
      lessons: 24,
      rating: 4.8,
      completionRate: 78,
      revenue: 12450
    },
    {
      id: 2,
      title: "Python for Data Science",
      description: "Learn Python, pandas, numpy, and machine learning basics",
      thumbnail: null,
      status: "Published",
      students: 567,
      lessons: 32,
      rating: 4.9,
      completionRate: 82,
      revenue: 18900
    },
    {
      id: 3,
      title: "JavaScript Fundamentals",
      description: "Master the basics of JavaScript programming",
      thumbnail: null,
      status: "Draft",
      students: 0,
      lessons: 18,
      rating: 0,
      completionRate: 0,
      revenue: 0
    },
    {
      id: 4,
      title: "System Design Interview",
      description: "Prepare for system design interviews at top tech companies",
      thumbnail: null,
      status: "Published",
      students: 234,
      lessons: 15,
      rating: 4.7,
      completionRate: 65,
      revenue: 8900
    }
  ];

  const students = [
    { name: "Sarah Johnson", avatar: "/api/placeholder/40/40", course: "React Development", progress: 85, lastActive: "2 hours ago" },
    { name: "Mike Chen", avatar: "/api/placeholder/40/40", course: "Python Data Science", progress: 92, lastActive: "1 day ago" },
    { name: "Alex Rodriguez", avatar: "/api/placeholder/40/40", course: "JavaScript Fundamentals", progress: 45, lastActive: "3 days ago" },
    { name: "Emma Wilson", avatar: "/api/placeholder/40/40", course: "System Design", progress: 70, lastActive: "5 hours ago" },
    { name: "James Lee", avatar: "/api/placeholder/40/40", course: "React Development", progress: 30, lastActive: "1 week ago" }
  ];

  const assessments = [
    {
      id: 1,
      title: "React Hooks Quiz",
      course: "Advanced React Development",
      type: "MCQ",
      duration: "30 min",
      submissions: 156,
      averageScore: 82
    },
    {
      id: 2,
      title: "Python Data Structures",
      course: "Python for Data Science",
      type: "Coding",
      duration: "45 min",
      submissions: 234,
      averageScore: 76
    },
    {
      id: 3,
      title: "JavaScript Closures",
      course: "JavaScript Fundamentals",
      type: "MCQ",
      duration: "20 min",
      submissions: 89,
      averageScore: 88
    }
  ];

  const analyticsData = {
    enrollments: [
      { label: "Jan", value: 45, percentage: 45 },
      { label: "Feb", value: 62, percentage: 62 },
      { label: "Mar", value: 78, percentage: 78 },
      { label: "Apr", value: 91, percentage: 91 },
      { label: "May", value: 85, percentage: 85 },
      { label: "Jun", value: 102, percentage: 100 }
    ],
    completionRates: [
      { label: "React", value: 78, percentage: 78 },
      { label: "Python", value: 82, percentage: 82 },
      { label: "JavaScript", value: 65, percentage: 65 },
      { label: "System Design", value: 70, percentage: 70 }
    ]
  };

  const navigation = [
    { name: 'Dashboard', icon: Home, id: 'dashboard' },
    { name: 'My Courses', icon: Video, id: 'courses' },
    { name: 'Students', icon: Users, id: 'students' },
    { name: 'Assessments', icon: FileText, id: 'assessments' },
    { name: 'Analytics', icon: BarChart3, id: 'analytics' },
    { name: 'Messages', icon: MessageSquare, id: 'messages' },
    { name: 'Settings', icon: Settings, id: 'settings' }
  ];

  const handleEditCourse = (course) => {
    console.log("Edit course:", course);
    // Navigate to course editor
  };

  const handleDeleteCourse = (course) => {
    if (window.confirm(`Are you sure you want to delete "${course.title}"?`)) {
      console.log("Delete course:", course);
    }
  };

  const handleViewCourse = (course) => {
    console.log("View course:", course);
    // Navigate to course details
  };

  const handleEditAssessment = (assessment) => {
    console.log("Edit assessment:", assessment);
  };

  const handleDeleteAssessment = (assessment) => {
    if (window.confirm(`Are you sure you want to delete "${assessment.title}"?`)) {
      console.log("Delete assessment:", assessment);
    }
  };

  const handleViewAssessment = (assessment) => {
    console.log("View assessment results:", assessment);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-primary-dark text-gray-900 dark:text-white">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-800 shadow-xl z-50
          ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
          {isSidebarOpen ? (
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <span className="font-bold text-xl">LearnFlow</span>
            </Link>
          ) : (
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-xl">L</span>
            </div>
          )}
          
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Professor Profile */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <img src={professor.avatar} alt={professor.name} className="w-10 h-10 rounded-full" />
            {isSidebarOpen && (
              <div>
                <h4 className="font-semibold text-sm line-clamp-1">{professor.name}</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">{professor.title}</p>
              </div>
            )}
          </div>
          
          {isSidebarOpen && (
            <div className="mt-3 text-xs text-gray-600 dark:text-gray-400">
              <p className="line-clamp-1">{professor.institution}</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navigation.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ x: 5 }}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                ${activeTab === item.id 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
              <item.icon className="w-5 h-5" />
              {isSidebarOpen && <span className="text-sm">{item.name}</span>}
            </motion.button>
          ))}
          
          {/* Logout */}
          <motion.button
            whileHover={{ x: 5 }}
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors mt-8"
          >
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span className="text-sm">Logout</span>}
          </motion.button>
        </nav>
      </motion.aside>

      {/* Main Content */}
      <main className={`${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 p-8`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">
              Welcome back, {professor.name.split(' ')[0]}! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Here's what's happening with your courses today
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                  focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            {/* Notifications */}
            <button className="relative p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            {/* Dark Mode Toggle */}
            <DarkModeToggle />
          </div>
        </div>

        {/* Quick Stats */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: "Total Students", value: professor.totalStudents, icon: Users, color: "bg-blue-500" },
            { label: "Active Courses", value: professor.totalCourses, icon: Video, color: "bg-green-500" },
            { label: "Total Revenue", value: `$${professor.totalRevenue}`, icon: DollarSign, color: "bg-purple-500" },
            { label: "Avg. Rating", value: professor.rating, icon: Star, color: "bg-yellow-500" }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold">{stat.value}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2 flex-wrap">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors
                  ${activeTab === item.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
              >
                {item.name}
              </button>
            ))}
          </div>
          
          {/* Create New Button */}
          {activeTab === 'courses' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddCourseModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-medium flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              New Course
            </motion.button>
          )}
          
          {activeTab === 'assessments' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-medium flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              New Assessment
            </motion.button>
          )}
        </div>

        {/* Main Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Dashboard Overview */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                {/* Performance Chart */}
                <div className="grid lg:grid-cols-2 gap-6">
                  <AnalyticsChart data={analyticsData.enrollments} title="Monthly Enrollments" />
                  <AnalyticsChart data={analyticsData.completionRates} title="Course Completion Rates" />
                </div>

                {/* Recent Students */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Recent Student Activity</h2>
                    <button 
                      onClick={() => setActiveTab('students')}
                      className="text-sm text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
                    >
                      View All <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {students.slice(0, 3).map((student, idx) => (
                      <StudentProgressCard key={idx} student={student} />
                    ))}
                  </div>
                </section>

                {/* Recent Assessments */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Recent Assessments</h2>
                    <button 
                      onClick={() => setActiveTab('assessments')}
                      className="text-sm text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
                    >
                      View All <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {assessments.slice(0, 2).map((assessment, idx) => (
                      <AssessmentCard
                        key={idx}
                        assessment={assessment}
                        onEdit={handleEditAssessment}
                        onDelete={handleDeleteAssessment}
                        onView={handleViewAssessment}
                      />
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* My Courses */}
            {activeTab === 'courses' && (
              <div className="space-y-6">
                {/* Filters */}
                <div className="flex gap-4 flex-wrap">
                  <select 
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                    value={courseStatusFilter}
                    onChange={(e) => setCourseStatusFilter(e.target.value)}
                  >
                    <option value="">All Status</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                  <select 
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                    value={courseSortFilter}
                    onChange={(e) => setCourseSortFilter(e.target.value)}
                  >
                    <option value="">Sort by: Recent</option>
                    <option value="students">Most Students</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filter
                  </button>
                </div>

                {/* Course Grid */}
                <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
                  {courses.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      onEdit={handleEditCourse}
                      onDelete={handleDeleteCourse}
                      onView={handleViewCourse}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Students */}
            {activeTab === 'students' && (
              <div className="space-y-6">
                {/* Filters */}
                <div className="flex gap-4 flex-wrap">
                  <select 
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                    value={studentCourseFilter}
                    onChange={(e) => setStudentCourseFilter(e.target.value)}
                  >
                    <option value="">All Courses</option>
                    {courses.map(c => (
                      <option key={c.id} value={c.title}>{c.title}</option>
                    ))}
                  </select>
                  {/* <select 
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                    value={studentProgressFilter}
                    onChange={(e) => setStudentProgressFilter(e.target.value)}
                  >
                    <option value="">All Progress</option>
                    <option value="high">High (>75%)</option>
                    <option value="medium">Medium (50-75%)</option>
                    <option value="low">Low (<50%)</option>
                  </select> */}
                  <input
                    type="text"
                    placeholder="Search students..."
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                    value={studentSearchQuery}
                    onChange={(e) => setStudentSearchQuery(e.target.value)}
                  />
                </div>

                {/* Students Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {students
                    .filter(student => 
                      (studentCourseFilter === '' || student.course === studentCourseFilter) &&
                      (studentProgressFilter === '' || 
                        (studentProgressFilter === 'high' && student.progress >= 75) ||
                        (studentProgressFilter === 'medium' && student.progress >= 50 && student.progress < 75) ||
                        (studentProgressFilter === 'low' && student.progress < 50)
                      ) &&
                      (studentSearchQuery === '' || student.name.toLowerCase().includes(studentSearchQuery.toLowerCase()))
                    )
                    .map((student, idx) => (
                      <StudentProgressCard key={idx} student={student} />
                    ))}
                </div>
              </div>
            )}

            {/* Assessments */}
            {activeTab === 'assessments' && (
              <div className="space-y-6">
                {/* Filters */}
                <div className="flex gap-4 flex-wrap">
                  <select 
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                    value={assessmentTypeFilter}
                    onChange={(e) => setAssessmentTypeFilter(e.target.value)}
                  >
                    <option value="">All Types</option>
                    <option value="MCQ">MCQ</option>
                    <option value="Coding">Coding</option>
                    <option value="Assignment">Assignment</option>
                  </select>
                  <select 
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                    value={assessmentCourseFilter}
                    onChange={(e) => setAssessmentCourseFilter(e.target.value)}
                  >
                    <option value="">All Courses</option>
                    {courses.map(c => (
                      <option key={c.id} value={c.title}>{c.title}</option>
                    ))}
                  </select>
                </div>

                {/* Assessments Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {assessments
                    .filter(assessment =>
                      (assessmentTypeFilter === '' || assessment.type === assessmentTypeFilter) &&
                      (assessmentCourseFilter === '' || assessment.course === assessmentCourseFilter)
                    )
                    .map((assessment) => (
                      <AssessmentCard
                        key={assessment.id}
                        assessment={assessment}
                        onEdit={handleEditAssessment}
                        onDelete={handleDeleteAssessment}
                        onView={handleViewAssessment}
                      />
                    ))}
                </div>
              </div>
            )}

            {/* Analytics */}
            {activeTab === 'analytics' && (
              <div className="space-y-8">
                {/* Charts */}
                <div className="grid lg:grid-cols-2 gap-6">
                  <AnalyticsChart data={analyticsData.enrollments} title="Enrollment Trends" />
                  <AnalyticsChart data={analyticsData.completionRates} title="Course Performance" />
                </div>

                {/* Revenue Stats */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                  <h3 className="font-semibold mb-4">Revenue Overview</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "Monthly", value: "$12,450" },
                      { label: "Quarterly", value: "$35,780" },
                      { label: "Yearly", value: "$142,300" },
                      { label: "Lifetime", value: "$452,300" }
                    ].map((item, idx) => (
                      <div key={idx} className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div className="text-sm text-gray-600 dark:text-gray-400">{item.label}</div>
                        <div className="text-xl font-bold text-purple-600">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Export Buttons */}
                <div className="flex gap-4">
                  <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export Report
                  </button>
                  <button className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium border border-gray-300 dark:border-gray-600 flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Share Insights
                  </button>
                </div>
              </div>
            )}

            {/* Messages */}
            {activeTab === 'messages' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
                <MessageSquare className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Messages Coming Soon</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  The messaging system is under development. You'll be able to communicate with students here.
                </p>
              </div>
            )}

            {/* Settings */}
            {activeTab === 'settings' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
                <Settings className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Settings Coming Soon</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  You'll be able to manage your profile, notifications, and preferences here.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default ProfessorDashboard;