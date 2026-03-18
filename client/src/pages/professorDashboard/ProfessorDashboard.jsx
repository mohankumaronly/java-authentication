import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, Video, Code2, Users, Award, BookOpen, Settings,
  LogOut, Menu, X, Moon, Sun, Bell, Search, BarChart3,
  FileText, PlusCircle, Edit, Trash2, Eye, Download, Upload,
  ChevronDown, Filter, Grid, List, MoreVertical, CheckCircle,
  Clock, TrendingUp, Star, MessageSquare, Mail, Calendar,
  DollarSign, Share2, Copy, ExternalLink, Info, RefreshCw,
  Maximize2, Minimize2
} from "lucide-react";

// Import Recharts components
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area,
  ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, ScatterChart, Scatter, ZAxis
} from 'recharts';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
};

// Custom Tooltip for Charts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
        <p className="font-semibold text-sm mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-3 text-sm">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-gray-600 dark:text-gray-400">{entry.name}:</span>
            <span className="font-bold">{entry.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// Mobile Menu Component
const MobileMenu = ({ isOpen, onClose, navigation, activeTab, setActiveTab, professor, onLogout }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          />
          
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 z-50 shadow-2xl lg:hidden"
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">L</span>
                  </div>
                  <span className="font-bold text-lg">LearnFlow</span>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mt-4 flex items-center gap-3">
                <img src={professor.avatar} alt={professor.name} className="w-10 h-10 rounded-full" />
                <div className="min-w-0">
                  <h4 className="font-semibold text-sm truncate">{professor.name}</h4>
                  <p className="text-xs text-gray-500 truncate">{professor.title}</p>
                </div>
              </div>
            </div>
            
            <nav className="p-4 space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
                    ${activeTab === item.id 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm flex-1 text-left">{item.name}</span>
                </button>
              ))}
              
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-colors mt-8"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm">Logout</span>
              </button>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
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
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <motion.button
      whileHover={{ scale: 1.1, rotate: 15 }}
      whileTap={{ scale: 0.9 }}
      className="p-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 shadow-md hover:shadow-lg transition-all"
      onClick={() => setDarkMode((prev) => !prev)}
    >
      <AnimatePresence mode="wait">
        {darkMode ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="w-4 h-4 text-yellow-500" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="w-4 h-4 text-indigo-500" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

// Course Card Component
const CourseCard = ({ course, onEdit, onDelete, onView }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      variants={fadeInUp}
      whileHover={{ y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
    >
      {/* Course Thumbnail */}
      <div className="relative aspect-video bg-gradient-to-r from-purple-500 to-pink-500">
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

        {/* Hover Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 flex items-center justify-center gap-2"
            >
              <button
                onClick={() => onView(course)}
                className="p-2 bg-white rounded-lg text-gray-900 hover:bg-gray-100"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={() => onEdit(course)}
                className="p-2 bg-white rounded-lg text-gray-900 hover:bg-gray-100"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(course)}
                className="p-2 bg-white rounded-lg text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Course Info */}
      <div className="p-4">
        <h3 className="font-semibold text-base mb-1 line-clamp-1">{course.title}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{course.description}</p>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="text-sm font-bold">{course.students}</div>
            <div className="text-xs text-gray-500">Students</div>
          </div>
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="text-sm font-bold">{course.lessons}</div>
            <div className="text-xs text-gray-500">Lessons</div>
          </div>
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="text-sm font-bold">{course.rating}</div>
            <div className="text-xs text-gray-500">Rating</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-500">Completion Rate</span>
            <span className="font-medium">{course.completionRate}%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${course.completionRate}%` }}
              transition={{ duration: 1 }}
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            />
          </div>
        </div>
        
        {/* Revenue */}
        {course.revenue > 0 && (
          <div className="flex items-center justify-between text-xs mb-3 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <span className="text-green-600 dark:text-green-400">Revenue</span>
            <span className="font-bold text-green-600 dark:text-green-400">${course.revenue}</span>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onView(course)}
            className="flex-1 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-xs font-medium hover:opacity-90 transition-opacity"
          >
            View Details
          </button>
          <button
            onClick={() => onEdit(course)}
            className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <Edit className="w-3 h-3" />
          </button>
          <button
            onClick={() => onDelete(course)}
            className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <Trash2 className="w-3 h-3" />
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
      whileHover={{ y: -2 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all"
    >
      <div className="flex items-center gap-3">
        <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full" />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm truncate">{student.name}</h4>
          <p className="text-xs text-gray-500 truncate">{student.course}</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap
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
      <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
        <Clock className="w-3 h-3" />
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
      whileHover={{ y: -2 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm truncate">{assessment.title}</h4>
          <p className="text-xs text-gray-500 truncate">{assessment.course}</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap ml-2
          ${assessment.type === 'MCQ' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' :
            assessment.type === 'Coding' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600' :
            'bg-green-100 dark:bg-green-900/30 text-green-600'}`}
        >
          {assessment.type}
        </span>
      </div>
      
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="text-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <Clock className="w-3 h-3 mx-auto mb-1 text-gray-500" />
          <span className="text-xs font-medium">{assessment.duration}</span>
        </div>
        <div className="text-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <Users className="w-3 h-3 mx-auto mb-1 text-gray-500" />
          <span className="text-xs font-medium">{assessment.submissions}</span>
        </div>
        <div className="text-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <CheckCircle className="w-3 h-3 mx-auto mb-1 text-gray-500" />
          <span className="text-xs font-medium">{assessment.averageScore}%</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={() => onView(assessment)}
          className="flex-1 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          View Results
        </button>
        <button
          onClick={() => onEdit(assessment)}
          className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          <Edit className="w-3 h-3" />
        </button>
        <button
          onClick={() => onDelete(assessment)}
          className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>
    </motion.div>
  );
};

// Enhanced Analytics Dashboard Component
const ProfessorAnalytics = ({ data, timeframe, onTimeframeChange }) => {
  const [chartType, setChartType] = useState('line');
  const [fullscreen, setFullscreen] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('enrollments');
  const [compareMode, setCompareMode] = useState(false);

  const COLORS = ['#6366f1', '#ec4899', '#14b8a6', '#f59e0b', '#ef4444', '#8b5cf6'];

  // Enhanced analytics data
  const analyticsData = {
    enrollments: [
      { month: 'Jan', students: 450, revenue: 12500, courses: 12 },
      { month: 'Feb', students: 620, revenue: 18200, courses: 14 },
      { month: 'Mar', students: 780, revenue: 23400, courses: 16 },
      { month: 'Apr', students: 910, revenue: 27300, courses: 18 },
      { month: 'May', students: 850, revenue: 25500, courses: 17 },
      { month: 'Jun', students: 1020, revenue: 30600, courses: 20 },
      { month: 'Jul', students: 1150, revenue: 34500, courses: 22 },
      { month: 'Aug', students: 1280, revenue: 38400, courses: 24 },
    ],
    courses: [
      { name: 'React Mastery', students: 342, completion: 78, rating: 4.8, revenue: 12450 },
      { name: 'Python Data Science', students: 567, completion: 82, rating: 4.9, revenue: 18900 },
      { name: 'JavaScript Fundamentals', students: 234, completion: 65, rating: 4.7, revenue: 8900 },
      { name: 'System Design', students: 189, completion: 70, rating: 4.6, revenue: 6700 },
      { name: 'Machine Learning', students: 423, completion: 45, rating: 4.5, revenue: 15600 },
      { name: 'AWS Certification', students: 298, completion: 55, rating: 4.7, revenue: 11200 },
    ],
    demographics: [
      { name: '18-24', value: 30 },
      { name: '25-34', value: 45 },
      { name: '35-44', value: 15 },
      { name: '45+', value: 10 },
    ],
    performance: [
      { subject: 'Engagement', current: 85, target: 90, fullMark: 100 },
      { subject: 'Completion', current: 78, target: 85, fullMark: 100 },
      { subject: 'Satisfaction', current: 92, target: 95, fullMark: 100 },
      { subject: 'Retention', current: 75, target: 80, fullMark: 100 },
      { subject: 'Growth', current: 88, target: 85, fullMark: 100 },
    ],
    dailyActivity: [
      { day: 'Mon', views: 245, completions: 78 },
      { day: 'Tue', views: 312, completions: 92 },
      { day: 'Wed', views: 298, completions: 85 },
      { day: 'Thu', views: 356, completions: 102 },
      { day: 'Fri', views: 401, completions: 118 },
      { day: 'Sat', views: 287, completions: 76 },
      { day: 'Sun', views: 234, completions: 65 },
    ]
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
        <div className="flex items-center gap-3 flex-wrap">
          <select
            value={timeframe}
            onChange={(e) => onTimeframeChange(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
          >
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
            <option value="custom">Custom Range</option>
          </select>

          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
          >
            <option value="enrollments">Enrollments</option>
            <option value="revenue">Revenue</option>
            <option value="completion">Completion Rate</option>
            <option value="engagement">Student Engagement</option>
          </select>

          <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
            {['line', 'bar', 'area', 'composed'].map((type) => (
              <button
                key={type}
                onClick={() => setChartType(type)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-all
                  ${chartType === type 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCompareMode(!compareMode)}
            className={`px-3 py-2 text-sm rounded-lg flex items-center gap-2 transition-all
              ${compareMode 
                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
          >
            <TrendingUp className="w-4 h-4" />
            Compare
          </button>
          
          <button
            onClick={() => setFullscreen(!fullscreen)}
            className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            {fullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          
          <button className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Students', value: '2,847', change: '+12.3%', icon: Users, color: 'blue' },
          { label: 'Active Courses', value: '24', change: '+4', icon: BookOpen, color: 'green' },
          { label: 'Revenue (MTD)', value: '$45.2K', change: '+18.2%', icon: DollarSign, color: 'purple' },
          { label: 'Avg Completion', value: '74%', change: '+5.4%', icon: Clock, color: 'orange' },
        ].map((kpi, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -4 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 bg-${kpi.color}-100 dark:bg-${kpi.color}-900/30 rounded-lg flex items-center justify-center`}>
                <kpi.icon className={`w-5 h-5 text-${kpi.color}-600`} />
              </div>
              <span className="text-sm text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                {kpi.change}
              </span>
            </div>
            <p className="text-2xl font-bold">{kpi.value}</p>
            <p className="text-sm text-gray-500 mt-1">{kpi.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Chart Area */}
      <motion.div 
        layout
        className={`grid ${fullscreen ? 'grid-cols-1' : 'lg:grid-cols-2'} gap-6`}
      >
        {/* Primary Chart - Trends */}
        <motion.div 
          layout
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-lg">Enrollment & Revenue Trends</h3>
              <p className="text-sm text-gray-500">Monthly performance analysis</p>
            </div>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <Info className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          <ResponsiveContainer width="100%" height={350}>
            {chartType === 'line' && (
              <LineChart data={analyticsData.enrollments}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis yAxisId="left" stroke="#6B7280" />
                <YAxis yAxisId="right" orientation="right" stroke="#6B7280" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="students" 
                  stroke="#6366f1" 
                  strokeWidth={3}
                  dot={{ r: 6, fill: "#6366f1" }}
                  activeDot={{ r: 8 }}
                  name="Students"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#ec4899" 
                  strokeWidth={3}
                  dot={{ r: 6, fill: "#ec4899" }}
                  name="Revenue ($)"
                />
              </LineChart>
            )}

            {chartType === 'bar' && (
              <BarChart data={analyticsData.enrollments}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="students" fill="#6366f1" radius={[4, 4, 0, 0]} />
                {compareMode && (
                  <Bar dataKey="revenue" fill="#ec4899" radius={[4, 4, 0, 0]} />
                )}
              </BarChart>
            )}

            {chartType === 'area' && (
              <AreaChart data={analyticsData.enrollments}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="students" 
                  stroke="#6366f1" 
                  fill="url(#colorStudents)" 
                  fillOpacity={0.3}
                  name="Students"
                />
                {compareMode && (
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#ec4899" 
                    fill="url(#colorRevenue)" 
                    fillOpacity={0.3}
                    name="Revenue"
                  />
                )}
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            )}

            {chartType === 'composed' && (
              <ComposedChart data={analyticsData.enrollments}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="students" barSize={20} fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Line type="monotone" dataKey="revenue" stroke="#ec4899" strokeWidth={2} />
              </ComposedChart>
            )}
          </ResponsiveContainer>
        </motion.div>

        {/* Course Performance Chart */}
        <motion.div 
          layout
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <h3 className="font-semibold text-lg mb-6">Course Performance</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={analyticsData.courses} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis type="number" stroke="#6B7280" />
              <YAxis dataKey="name" type="category" stroke="#6B7280" width={120} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="students" fill="#6366f1" radius={[0, 4, 4, 0]} name="Students" />
              <Bar dataKey="completion" fill="#ec4899" radius={[0, 4, 4, 0]} name="Completion %" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Demographics Pie Chart */}
        <motion.div 
          layout
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <h3 className="font-semibold text-lg mb-6">Student Demographics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={analyticsData.demographics}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {analyticsData.demographics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            <div className="space-y-3">
              {analyticsData.demographics.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="font-bold">{item.value}%</span>
                </div>
              ))}
              <div className="pt-3 mt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total Students</span>
                  <span className="font-bold">2,847</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Performance Radar Chart */}
        <motion.div 
          layout
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <h3 className="font-semibold text-lg mb-6">Course Health Metrics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={analyticsData.performance}>
              <PolarGrid stroke="#374151" strokeDasharray="3 3" />
              <PolarAngleAxis dataKey="subject" stroke="#6B7280" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#6B7280" />
              <Radar name="Current" dataKey="current" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
              <Radar name="Target" dataKey="target" stroke="#ec4899" fill="#ec4899" fillOpacity={0.6} />
              <Legend />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Daily Activity Heatmap (Bar Chart) */}
        <motion.div 
          layout
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg lg:col-span-2"
        >
          <h3 className="font-semibold text-lg mb-6">Daily Student Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.dailyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis dataKey="day" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="views" fill="#6366f1" radius={[4, 4, 0, 0]} name="Course Views" />
              <Bar dataKey="completions" fill="#10b981" radius={[4, 4, 0, 0]} name="Lesson Completions" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>

      {/* Revenue Breakdown Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Course Revenue Breakdown</h3>
          <button className="text-sm text-purple-600 flex items-center gap-1">
            <RefreshCw className="w-4 h-4" />
            Export Data
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Course</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Students</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Revenue</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Completion</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Rating</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Trend</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.courses.map((course, idx) => (
                <tr key={idx} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="py-3 px-4 font-medium">{course.name}</td>
                  <td className="py-3 px-4">{course.students}</td>
                  <td className="py-3 px-4 text-green-600 font-medium">${course.revenue.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span>{course.completion}%</span>
                      <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500" style={{ width: `${course.completion}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span>{course.rating}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-green-600 text-sm">+{Math.floor(Math.random() * 20)}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Options */}
      <div className="flex flex-col sm:flex-row gap-3 justify-end">
        <button className="px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all">
          <Download className="w-4 h-4" />
          Export Full Report (PDF)
        </button>
        <button className="px-4 py-2.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-600 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all">
          <Download className="w-4 h-4" />
          Export as CSV
        </button>
        <button className="px-4 py-2.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-600 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all">
          <Share2 className="w-4 h-4" />
          Share Dashboard
        </button>
      </div>
    </div>
  );
};

// Main Professor Dashboard Component
const ProfessorDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [timeframe, setTimeframe] = useState('month');
  
  // Filter states
  const [courseStatusFilter, setCourseStatusFilter] = useState('');
  const [courseSortFilter, setCourseSortFilter] = useState('');
  const [studentCourseFilter, setStudentCourseFilter] = useState('');
  const [studentSearchQuery, setStudentSearchQuery] = useState('');
  const [assessmentTypeFilter, setAssessmentTypeFilter] = useState('');
  const [assessmentCourseFilter, setAssessmentCourseFilter] = useState('');
  
  const navigate = useNavigate();

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
  };

  const handleDeleteCourse = (course) => {
    if (window.confirm(`Are you sure you want to delete "${course.title}"?`)) {
      console.log("Delete course:", course);
    }
  };

  const handleViewCourse = (course) => {
    console.log("View course:", course);
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

  const handleLogout = () => {
    navigate('/');
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
        professor={professor}
        onLogout={handleLogout}
      />

      {/* Desktop Sidebar */}
      <aside 
        className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-800 shadow-xl z-40 hidden lg:block transition-all duration-300 ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-gray-200 dark:border-gray-700">
          {isSidebarOpen ? (
            <div className="flex items-center justify-between w-full">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-xl">L</span>
                </div>
                <span className="font-bold text-xl whitespace-nowrap">LearnFlow</span>
              </Link>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-xl">L</span>
              </div>
            </div>
          )}
        </div>

        {/* Professor Profile */}
        {isSidebarOpen && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <img src={professor.avatar} alt={professor.name} className="w-10 h-10 rounded-full shrink-0" />
              <div className="min-w-0">
                <h4 className="font-semibold text-sm truncate">{professor.name}</h4>
                <p className="text-xs text-gray-500 truncate">{professor.title}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2 truncate">{professor.institution}</p>
          </div>
        )}

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                ${activeTab === item.id 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
              <item.icon className={`w-5 h-5 shrink-0 ${!isSidebarOpen && 'mx-auto'}`} />
              {isSidebarOpen && (
                <span className="text-sm flex-1 text-left">{item.name}</span>
              )}
            </button>
          ))}
          
          {/* Logout */}
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 mt-8
              ${isSidebarOpen 
                ? 'text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 justify-center'
              }`}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {isSidebarOpen && <span className="text-sm">Logout</span>}
          </button>
        </nav>
      </aside>

      {/* Desktop Sidebar Toggle Button */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed left-4 top-4 z-40 p-2.5 bg-white dark:bg-gray-800 rounded-xl shadow-lg hidden lg:block hover:shadow-xl transition-all"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}

      {/* Main Content */}
      <main className={`transition-all duration-300 ${
        isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
      } p-4 md:p-6 lg:p-8 pt-20 lg:pt-8`}>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold">
              Welcome back, {professor.name.split(' ')[0]}! 👋
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Here's what's happening with your courses today
            </p>
          </div>
          
          <div className="flex items-center gap-3 self-end md:self-auto">
            {/* Desktop Search */}
            <div className="hidden md:block relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 w-64"
              />
            </div>
            
            {/* Notifications */}
            <button className="relative p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            {/* Dark Mode Toggle */}
            <DarkModeToggle />
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Quick Stats */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6"
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
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-8 h-8 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold">{stat.value}</span>
              </div>
              <p className="text-gray-500 text-xs">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tab Navigation - Scrollable on mobile */}
        <div className="overflow-x-auto pb-2 mb-4 -mx-4 px-4 scrollbar-hide">
          <div className="flex gap-2 min-w-max">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200
                  ${activeTab === item.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm'
                  }`}
              >
                <span className="flex items-center gap-1.5">
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Action Bar */}
        {(activeTab === 'courses' || activeTab === 'assessments') && (
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-purple-100 dark:bg-purple-900/30' : 'bg-white dark:bg-gray-800'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-purple-100 dark:bg-purple-900/30' : 'bg-white dark:bg-gray-800'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddCourseModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden xs:inline">New {activeTab === 'courses' ? 'Course' : 'Assessment'}</span>
            </motion.button>
          </div>
        )}

        {/* Main Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Dashboard Overview */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Simple Charts for Dashboard */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                    <h3 className="font-semibold mb-4">Monthly Enrollments</h3>
                    <div className="space-y-3">
                      {[45, 62, 78, 91, 85, 102].map((value, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-500">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][idx]}</span>
                            <span className="font-medium">{value}</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${value}%` }}
                              transition={{ delay: idx * 0.1, duration: 0.8 }}
                              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                    <h3 className="font-semibold mb-4">Course Completion Rates</h3>
                    <div className="space-y-3">
                      {[
                        { label: "React", value: 78 },
                        { label: "Python", value: 82 },
                        { label: "JavaScript", value: 65 },
                        { label: "System Design", value: 70 }
                      ].map((item, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-500">{item.label}</span>
                            <span className="font-medium">{item.value}%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${item.value}%` }}
                              transition={{ delay: idx * 0.1, duration: 0.8 }}
                              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Students */}
                <section>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-semibold">Recent Student Activity</h2>
                    <button 
                      onClick={() => setActiveTab('students')}
                      className="text-sm text-purple-600 flex items-center gap-0.5"
                    >
                      View All <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {students.slice(0, 3).map((student, idx) => (
                      <StudentProgressCard key={idx} student={student} />
                    ))}
                  </div>
                </section>

                {/* Recent Assessments */}
                <section>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-semibold">Recent Assessments</h2>
                    <button 
                      onClick={() => setActiveTab('assessments')}
                      className="text-sm text-purple-600 flex items-center gap-0.5"
                    >
                      View All <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {assessments.slice(0, 2).map((assessment) => (
                      <AssessmentCard
                        key={assessment.id}
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
              <div className="space-y-4">
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <select 
                    className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                    value={courseStatusFilter}
                    onChange={(e) => setCourseStatusFilter(e.target.value)}
                  >
                    <option value="">All Status</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                  <select 
                    className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                    value={courseSortFilter}
                    onChange={(e) => setCourseSortFilter(e.target.value)}
                  >
                    <option value="">Sort by: Recent</option>
                    <option value="students">Most Students</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>

                {/* Course Grid */}
                <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'} gap-4`}>
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
              <div className="space-y-4">
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <select 
                    className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                    value={studentCourseFilter}
                    onChange={(e) => setStudentCourseFilter(e.target.value)}
                  >
                    <option value="">All Courses</option>
                    {courses.map(c => (
                      <option key={c.id} value={c.title}>{c.title}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Search students..."
                    className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 flex-1"
                    value={studentSearchQuery}
                    onChange={(e) => setStudentSearchQuery(e.target.value)}
                  />
                </div>

                {/* Students Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {students
                    .filter(student => 
                      (studentCourseFilter === '' || student.course === studentCourseFilter) &&
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
              <div className="space-y-4">
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <select 
                    className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                    value={assessmentTypeFilter}
                    onChange={(e) => setAssessmentTypeFilter(e.target.value)}
                  >
                    <option value="">All Types</option>
                    <option value="MCQ">MCQ</option>
                    <option value="Coding">Coding</option>
                    <option value="Assignment">Assignment</option>
                  </select>
                  <select 
                    className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
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
                <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'} gap-4`}>
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

            {/* Enhanced Analytics */}
            {activeTab === 'analytics' && (
              <ProfessorAnalytics 
                data={{}}
                timeframe={timeframe}
                onTimeframeChange={setTimeframe}
              />
            )}

            {/* Messages */}
            {activeTab === 'messages' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
                <MessageSquare className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                <h3 className="text-lg font-semibold mb-2">Messages Coming Soon</h3>
                <p className="text-sm text-gray-500">
                  The messaging system is under development. You'll be able to communicate with students here.
                </p>
              </div>
            )}

            {/* Settings */}
            {activeTab === 'settings' && (
              <div className="max-w-2xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Profile Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <input 
                        type="text" 
                        value={professor.name}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input 
                        type="email" 
                        value="emily.roberts@stanford.edu"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Institution</label>
                      <input 
                        type="text" 
                        value={professor.institution}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"
                      />
                    </div>
                    <button className="w-full py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default ProfessorDashboard;