export const mockUser = {
  name: "Sarah Johnson",
  avatar: "/api/placeholder/40/40",
  streak: 15,
  level: 12,
  points: 2340,
  nextLevel: 2500,
  email: "sarah@example.com",
  joinDate: "January 2025",
  bio: "Passionate developer on a journey to master full-stack development",
  social: {
    github: "sarahjohnson",
    linkedin: "sarah-johnson-dev",
    twitter: "@sarahcodes"
  },
  preferences: {
    emailNotifications: true,
    darkMode: true,
    language: "English"
  }
};

// Use string identifiers instead of JSX
export const mockStats = [
  { icon: 'video', value: "12", label: "Active Courses", color: "bg-blue-100 dark:bg-blue-900/30" },
  { icon: 'code', value: "48", label: "Challenges", color: "bg-green-100 dark:bg-green-900/30" },
  { icon: 'trophy', value: "8", label: "Certificates", color: "bg-yellow-100 dark:bg-yellow-900/30" },
  { icon: 'flame', value: "15", label: "Day Streak", color: "bg-orange-100 dark:bg-orange-900/30" }
];

export const mockCourses = {
  myCourses: [
    {
      id: 1,
      title: "React Fundamentals",
      instructor: "John Doe",
      instructorAvatar: "/api/placeholder/32/32",
      thumbnail: "/api/placeholder/320/180",
      duration: "45:20",
      rating: 4.8,
      progress: 75,
      category: "Frontend",
      lastWatched: "2 hours ago",
      completedLessons: 15,
      totalLessons: 20
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      instructor: "Jane Smith",
      instructorAvatar: "/api/placeholder/32/32",
      thumbnail: "/api/placeholder/320/180",
      duration: "1:20:15",
      rating: 4.9,
      progress: 30,
      category: "JavaScript",
      lastWatched: "Yesterday",
      completedLessons: 8,
      totalLessons: 25
    },
    {
      id: 3,
      title: "Python for Beginners",
      instructor: "Mike Johnson",
      instructorAvatar: "/api/placeholder/32/32",
      thumbnail: "/api/placeholder/320/180",
      duration: "50:10",
      rating: 4.7,
      progress: 100,
      category: "Python",
      completedLessons: 30,
      totalLessons: 30,
      completedDate: "2026-03-15"
    },
    {
      id: 4,
      title: "Data Structures",
      instructor: "Sarah Wilson",
      instructorAvatar: "/api/placeholder/32/32",
      thumbnail: "/api/placeholder/320/180",
      duration: "1:15:30",
      rating: 4.8,
      progress: 15,
      category: "Computer Science",
      lastWatched: "3 days ago",
      completedLessons: 4,
      totalLessons: 28
    },
    {
      id: 5,
      title: "TypeScript Masterclass",
      instructor: "Alex Chen",
      instructorAvatar: "/api/placeholder/32/32",
      thumbnail: "/api/placeholder/320/180",
      duration: "55:45",
      rating: 4.9,
      progress: 45,
      category: "Frontend",
      lastWatched: "5 hours ago",
      completedLessons: 12,
      totalLessons: 26
    },
    {
      id: 6,
      title: "Node.js API Development",
      instructor: "Emily Brown",
      instructorAvatar: "/api/placeholder/32/32",
      thumbnail: "/api/placeholder/320/180",
      duration: "1:30:20",
      rating: 4.6,
      progress: 60,
      category: "Backend",
      lastWatched: "1 day ago",
      completedLessons: 18,
      totalLessons: 30
    }
  ],
  
  exploreCourses: [
    {
      id: 101,
      title: "Web Development Bootcamp 2026",
      instructor: "Angela Yu",
      instructorAvatar: "/api/placeholder/32/32",
      description: "Complete guide to modern web development with React, Node.js, and more. Build 15+ real-world projects.",
      thumbnail: "/api/placeholder/320/180",
      duration: "40 hours",
      rating: 4.9,
      level: "Beginner",
      lessons: 320,
      isNew: true,
      isFree: false,
      price: 89.99,
      originalPrice: 199.99,
      isPopular: true,
      category: "Full Stack",
      students: 15420,
      language: "English",
      subtitles: ["Spanish", "French", "German"]
    },
    {
      id: 102,
      title: "Machine Learning A-Z",
      instructor: "Kirill Eremenko",
      instructorAvatar: "/api/placeholder/32/32",
      description: "Learn ML with Python, TensorFlow, and real-world projects. Includes neural networks and deep learning.",
      thumbnail: "/api/placeholder/320/180",
      duration: "35 hours",
      rating: 4.8,
      level: "Intermediate",
      lessons: 280,
      isNew: false,
      isFree: false,
      price: 94.99,
      originalPrice: 149.99,
      category: "Data Science",
      students: 12350,
      language: "English"
    },
    {
      id: 103,
      title: "Python for Beginners",
      instructor: "Jose Portilla",
      instructorAvatar: "/api/placeholder/32/32",
      description: "Learn Python programming from scratch with hands-on exercises and projects.",
      thumbnail: "/api/placeholder/320/180",
      duration: "25 hours",
      rating: 4.7,
      level: "Beginner",
      lessons: 150,
      isNew: true,
      isFree: true,
      isPopular: true,
      category: "Python",
      students: 45230,
      language: "English",
      subtitles: ["Spanish", "Hindi", "Chinese"]
    },
    {
      id: 104,
      title: "UI/UX Design Fundamentals",
      instructor: "Laura Martinez",
      instructorAvatar: "/api/placeholder/32/32",
      description: "Master the principles of user interface and user experience design.",
      thumbnail: "/api/placeholder/320/180",
      duration: "20 hours",
      rating: 4.8,
      level: "Beginner",
      lessons: 120,
      isNew: true,
      isFree: false,
      price: 49.99,
      originalPrice: 89.99,
      category: "Design",
      students: 8760,
      language: "English"
    },
    {
      id: 105,
      title: "DevOps with Docker & Kubernetes",
      instructor: "Michael Scott",
      instructorAvatar: "/api/placeholder/32/32",
      description: "Learn containerization and orchestration with hands-on projects.",
      thumbnail: "/api/placeholder/320/180",
      duration: "30 hours",
      rating: 4.9,
      level: "Intermediate",
      lessons: 200,
      isNew: false,
      isFree: false,
      price: 79.99,
      originalPrice: 129.99,
      category: "DevOps",
      students: 6540,
      language: "English"
    },
    {
      id: 106,
      title: "SQL Mastery",
      instructor: "Rachel Green",
      instructorAvatar: "/api/placeholder/32/32",
      description: "Master SQL queries, database design, and optimization techniques.",
      thumbnail: "/api/placeholder/320/180",
      duration: "15 hours",
      rating: 4.7,
      level: "Beginner",
      lessons: 100,
      isNew: true,
      isFree: true,
      category: "Database",
      students: 21340,
      language: "English"
    }
  ]
};

export const mockChallenges = [
  {
    id: 201,
    title: "Two Sum Problem",
    language: "Python",
    difficulty: "Easy",
    completed: "2.3k",
    timeLimit: "30 min",
    points: 100,
    successRate: "85%",
    category: "Arrays"
  },
  {
    id: 202,
    title: "Binary Tree Traversal",
    language: "Java",
    difficulty: "Medium",
    completed: "1.2k",
    timeLimit: "45 min",
    points: 200,
    successRate: "62%",
    category: "Trees"
  },
  {
    id: 203,
    title: "LRU Cache",
    language: "C++",
    difficulty: "Hard",
    completed: "567",
    timeLimit: "60 min",
    points: 300,
    successRate: "41%",
    category: "Data Structures"
  },
  {
    id: 204,
    title: "Valid Parentheses",
    language: "JavaScript",
    difficulty: "Easy",
    completed: "3.1k",
    timeLimit: "20 min",
    points: 100,
    successRate: "78%",
    category: "Stacks"
  },
  {
    id: 205,
    title: "Merge Sort Implementation",
    language: "Python",
    difficulty: "Medium",
    completed: "980",
    timeLimit: "40 min",
    points: 200,
    successRate: "58%",
    category: "Algorithms"
  },
  {
    id: 206,
    title: "Graph Dijkstra's Algorithm",
    language: "Java",
    difficulty: "Hard",
    completed: "432",
    timeLimit: "75 min",
    points: 350,
    successRate: "35%",
    category: "Graphs"
  },
  {
    id: 207,
    title: "Palindrome Checker",
    language: "JavaScript",
    difficulty: "Easy",
    completed: "4.2k",
    timeLimit: "15 min",
    points: 50,
    successRate: "92%",
    category: "Strings"
  },
  {
    id: 208,
    title: "Dynamic Programming: Fibonacci",
    language: "Python",
    difficulty: "Medium",
    completed: "1.8k",
    timeLimit: "30 min",
    points: 150,
    successRate: "71%",
    category: "DP"
  }
];

export const mockPosts = [
  {
    id: 301,
    userName: "Alex Chen",
    userAvatar: "/api/placeholder/40/40",
    userRole: "Full Stack Developer",
    timeAgo: "2h ago",
    content: "Just completed my ML project! 🚀 Built a neural network that can recognize handwritten digits with 98% accuracy. Check out the code in my repo!",
    image: "/api/placeholder/400/200",
    likes: 45,
    comments: 12,
    shares: 5,
    tags: ["machinelearning", "python", "ai"]
  },
  {
    id: 302,
    userName: "Maria Garcia",
    userAvatar: "/api/placeholder/40/40",
    userRole: "UI/UX Designer",
    timeAgo: "5h ago",
    content: "Check out my new portfolio! ✨ Spent the last month redesigning and coding it from scratch. Would love your feedback!",
    image: "/api/placeholder/400/200",
    likes: 89,
    comments: 23,
    shares: 12,
    tags: ["design", "portfolio", "webdev"]
  },
  {
    id: 303,
    userName: "David Kim",
    userAvatar: "/api/placeholder/40/40",
    userRole: "DevOps Engineer",
    timeAgo: "1d ago",
    content: "Question for the community: What's your preferred CI/CD pipeline setup? I'm currently using GitHub Actions vs Jenkins for a new project.",
    likes: 34,
    comments: 28,
    shares: 3,
    tags: ["devops", "cicd", "discussion"]
  },
  {
    id: 304,
    userName: "Priya Patel",
    userAvatar: "/api/placeholder/40/40",
    userRole: "Data Scientist",
    timeAgo: "2d ago",
    content: "Just published my first research paper on efficient transformer architectures! So excited to share it with you all! 📄",
    image: "/api/placeholder/400/200",
    likes: 156,
    comments: 34,
    shares: 45,
    tags: ["research", "ai", "transformers"]
  },
  {
    id: 305,
    userName: "James Wilson",
    userAvatar: "/api/placeholder/40/40",
    userRole: "Mobile Developer",
    timeAgo: "3d ago",
    content: "Tips for React Native developers: Use FlashList instead of FlatList for better performance with large datasets! Saved me hours of optimization work.",
    likes: 67,
    comments: 15,
    shares: 23,
    tags: ["reactnative", "mobile", "tips"]
  }
];

export const mockAchievements = [
  {
    id: 401,
    title: "Quick Learner",
    description: "Complete 5 courses in one month",
    icon: "Zap",
    progress: 3,
    total: 5,
    points: 100,
    unlocked: false,
    category: "Learning"
  },
  {
    id: 402,
    title: "Code Master",
    description: "Solve 50 coding challenges",
    icon: "Code2",
    progress: 48,
    total: 50,
    points: 200,
    unlocked: false,
    category: "Coding"
  },
  {
    id: 403,
    title: "Streak Champion",
    description: "Maintain a 30-day streak",
    icon: "Flame",
    progress: 15,
    total: 30,
    points: 300,
    unlocked: false,
    category: "Consistency"
  },
  {
    id: 404,
    title: "First Certificate",
    description: "Earn your first course certificate",
    icon: "Award",
    progress: 1,
    total: 1,
    points: 50,
    unlocked: true,
    category: "Achievement",
    unlockedDate: "2026-02-15"
  },
  {
    id: 405,
    title: "Community Helper",
    description: "Help 10 students in community forums",
    icon: "Users",
    progress: 7,
    total: 10,
    points: 150,
    unlocked: false,
    category: "Community"
  },
  {
    id: 406,
    title: "Project Pro",
    description: "Complete 5 course projects",
    icon: "Rocket",
    progress: 3,
    total: 5,
    points: 250,
    unlocked: false,
    category: "Projects"
  }
];

export const navigation = [
  { name: 'Dashboard', icon: 'Home', id: 'dashboard', badge: null },
  { name: 'My Courses', icon: 'Video', id: 'courses', badge: '6' },
  { name: 'Explore', icon: 'Globe', id: 'explore', badge: '12' },
  { name: 'Coding', icon: 'Code2', id: 'coding', badge: '3' },
  { name: 'AI Assistant', icon: 'Bot', id: 'ai', badge: null },
  { name: 'Community', icon: 'Users', id: 'community', badge: '8' },
  { name: 'Achievements', icon: 'Award', id: 'achievements', badge: '2' },
  { name: 'Settings', icon: 'Settings', id: 'settings', badge: null }
];

export const mockNotifications = [
  {
    id: 501,
    type: 'course',
    title: 'New course available',
    message: 'React Native Advanced is now available!',
    time: '10 min ago',
    read: false,
    actionUrl: '/explore/108'
  },
  {
    id: 502,
    type: 'achievement',
    title: 'Achievement unlocked!',
    message: 'You earned the "First Certificate" badge',
    time: '2 hours ago',
    read: false,
    actionUrl: '/achievements'
  },
  {
    id: 503,
    type: 'community',
    title: 'New reply to your post',
    message: 'Alex commented on your project showcase',
    time: '1 day ago',
    read: true,
    actionUrl: '/community/post/303'
  },
  {
    id: 504,
    type: 'reminder',
    title: 'Continue learning',
    message: 'You haven\'t studied in 2 days. Keep your streak alive!',
    time: '2 days ago',
    read: true,
    actionUrl: '/dashboard'
  }
];

export const mockLeaderboard = {
  weekly: [
    { rank: 1, name: "Alex Chen", points: 2450, avatar: "/api/placeholder/32/32", level: 15 },
    { rank: 2, name: "Sarah Johnson", points: 2340, avatar: "/api/placeholder/32/32", level: 12 },
    { rank: 3, name: "Maria Garcia", points: 2100, avatar: "/api/placeholder/32/32", level: 11 },
    { rank: 4, name: "David Kim", points: 1980, avatar: "/api/placeholder/32/32", level: 10 },
    { rank: 5, name: "Priya Patel", points: 1850, avatar: "/api/placeholder/32/32", level: 9 }
  ],
  monthly: [
    { rank: 1, name: "James Wilson", points: 8900, avatar: "/api/placeholder/32/32", level: 18 },
    { rank: 2, name: "Alex Chen", points: 8700, avatar: "/api/placeholder/32/32", level: 15 },
    { rank: 3, name: "Sarah Johnson", points: 8200, avatar: "/api/placeholder/32/32", level: 12 },
    { rank: 4, name: "Maria Garcia", points: 7900, avatar: "/api/placeholder/32/32", level: 11 },
    { rank: 5, name: "Rachel Green", points: 7600, avatar: "/api/placeholder/32/32", level: 10 }
  ],
  allTime: [
    { rank: 1, name: "Michael Chen", points: 45600, avatar: "/api/placeholder/32/32", level: 45 },
    { rank: 2, name: "Sarah Johnson", points: 42300, avatar: "/api/placeholder/32/32", level: 12 },
    { rank: 3, name: "James Wilson", points: 40100, avatar: "/api/placeholder/32/32", level: 18 },
    { rank: 4, name: "Emily Brown", points: 38700, avatar: "/api/placeholder/32/32", level: 35 },
    { rank: 5, name: "David Kim", points: 36500, avatar: "/api/placeholder/32/32", level: 10 }
  ]
};

export const mockCategories = [
  { id: 'frontend', name: 'Frontend Development', count: 45, icon: 'Code2' },
  { id: 'backend', name: 'Backend Development', count: 38, icon: 'Server' },
  { id: 'datascience', name: 'Data Science', count: 27, icon: 'BarChart3' },
  { id: 'mobile', name: 'Mobile Development', count: 22, icon: 'Smartphone' },
  { id: 'devops', name: 'DevOps', count: 19, icon: 'Cloud' },
  { id: 'design', name: 'UI/UX Design', count: 16, icon: 'Palette' },
  { id: 'ai', name: 'AI & Machine Learning', count: 24, icon: 'Brain' },
  { id: 'database', name: 'Databases', count: 15, icon: 'Database' }
];

export const mockLearningPaths = [
  {
    id: 601,
    title: "Frontend Developer Path",
    description: "Become a professional frontend developer",
    courses: 12,
    duration: "6 months",
    level: "Beginner to Advanced",
    progress: 35,
    icon: "Layout"
  },
  {
    id: 602,
    title: "Data Scientist Path",
    description: "Master data science and machine learning",
    courses: 15,
    duration: "8 months",
    level: "Intermediate",
    progress: 20,
    icon: "BarChart3"
  },
  {
    id: 603,
    title: "Full Stack Developer",
    description: "Complete full stack development training",
    courses: 18,
    duration: "10 months",
    level: "Beginner to Advanced",
    progress: 45,
    icon: "Globe"
  }
];

// Add this at the bottom of your mockData.js file

// Video details for each course
export const mockVideos = {
  // Course 1: React Fundamentals
  1: {
    id: 1,
    title: "React Fundamentals",
    description: "Learn the core concepts of React including components, props, state, and hooks. This comprehensive course will take you from zero to hero in React development.",
    instructor: "John Doe",
    instructorAvatar: "/api/placeholder/40/40",
    instructorSubscribers: "125K",
    duration: 2720, // 45:20 in seconds
    views: "45.2K",
    likes: 1245,
    publishedAt: "2024-01-15",
    thumbnail: "/api/placeholder/320/180",
    playlist: [
      { id: 101, title: "Introduction to React", duration: "8:15", isWatched: true },
      { id: 102, title: "JSX Deep Dive", duration: "12:30", isWatched: true },
      { id: 103, title: "Components and Props", duration: "15:45", isWatched: false },
      { id: 104, title: "State and Lifecycle", duration: "18:20", isWatched: false },
      { id: 105, title: "Handling Events", duration: "10:30", isWatched: false },
      { id: 106, title: "Conditional Rendering", duration: "9:15", isWatched: false },
      { id: 107, title: "Lists and Keys", duration: "11:00", isWatched: false },
      { id: 108, title: "Forms in React", duration: "14:25", isWatched: false },
      { id: 109, title: "Hooks Introduction", duration: "13:10", isWatched: false },
      { id: 110, title: "useState Hook", duration: "16:45", isWatched: false },
      { id: 111, title: "useEffect Hook", duration: "19:30", isWatched: false },
      { id: 112, title: "Context API", duration: "22:15", isWatched: false },
      { id: 113, title: "Custom Hooks", duration: "17:20", isWatched: false },
      { id: 114, title: "Performance Optimization", duration: "20:45", isWatched: false },
      { id: 115, title: "Testing React Apps", duration: "25:10", isWatched: false },
      { id: 116, title: "Deployment", duration: "15:30", isWatched: false }
    ]
  },
  
  // Course 2: Advanced JavaScript
  2: {
    id: 2,
    title: "Advanced JavaScript",
    description: "Master advanced JavaScript concepts including closures, prototypes, async programming, and more. Take your JavaScript skills to the next level.",
    instructor: "Jane Smith",
    instructorAvatar: "/api/placeholder/40/40",
    instructorSubscribers: "98K",
    duration: 4815, // 1:20:15 in seconds
    views: "32.8K",
    likes: 876,
    publishedAt: "2024-02-10",
    thumbnail: "/api/placeholder/320/180",
    playlist: [
      { id: 201, title: "JavaScript Engine & Runtime", duration: "12:30", isWatched: false },
      { id: 202, title: "Execution Context & Call Stack", duration: "15:45", isWatched: false },
      { id: 203, title: "Hoisting & Scope", duration: "11:20", isWatched: false },
      { id: 204, title: "Closures Deep Dive", duration: "18:30", isWatched: false },
      { id: 205, title: "Prototypes & Inheritance", duration: "22:15", isWatched: false },
      { id: 206, title: "This Keyword Explained", duration: "16:40", isWatched: false }
    ]
  },
  
  // Course 3: Python for Beginners
  3: {
    id: 3,
    title: "Python for Beginners",
    description: "Start your Python journey from scratch. Learn Python syntax, data structures, functions, and build real-world projects.",
    instructor: "Mike Johnson",
    instructorAvatar: "/api/placeholder/40/40",
    instructorSubscribers: "210K",
    duration: 3010, // 50:10 in seconds
    views: "78.5K",
    likes: 2341,
    publishedAt: "2024-01-05",
    thumbnail: "/api/placeholder/320/180",
    playlist: [
      { id: 301, title: "Python Installation", duration: "5:30", isWatched: true },
      { id: 302, title: "First Python Program", duration: "8:15", isWatched: true },
      { id: 303, title: "Variables & Data Types", duration: "12:45", isWatched: true },
      { id: 304, title: "Operators in Python", duration: "10:30", isWatched: true },
      { id: 305, title: "Control Flow", duration: "15:20", isWatched: false }
    ]
  },
  
  // Course 4: Data Structures
  4: {
    id: 4,
    title: "Data Structures",
    description: "Master essential data structures including arrays, linked lists, trees, graphs, and more. Perfect for coding interviews.",
    instructor: "Sarah Wilson",
    instructorAvatar: "/api/placeholder/40/40",
    instructorSubscribers: "156K",
    duration: 4530, // 1:15:30 in seconds
    views: "56.2K",
    likes: 1876,
    publishedAt: "2024-01-20",
    thumbnail: "/api/placeholder/320/180",
    playlist: [
      { id: 401, title: "Introduction to Data Structures", duration: "8:20", isWatched: true },
      { id: 402, title: "Arrays", duration: "15:30", isWatched: false },
      { id: 403, title: "Linked Lists", duration: "18:45", isWatched: false }
    ]
  },
  
  // Course 5: TypeScript Masterclass
  5: {
    id: 5,
    title: "TypeScript Masterclass",
    description: "Learn TypeScript from basics to advanced. Add static typing to JavaScript and build scalable applications.",
    instructor: "Alex Chen",
    instructorAvatar: "/api/placeholder/40/40",
    instructorSubscribers: "89K",
    duration: 3345, // 55:45 in seconds
    views: "23.4K",
    likes: 654,
    publishedAt: "2024-02-25",
    thumbnail: "/api/placeholder/320/180",
    playlist: [
      { id: 501, title: "TypeScript Introduction", duration: "10:15", isWatched: true },
      { id: 502, title: "Basic Types", duration: "12:30", isWatched: true },
      { id: 503, title: "Interfaces", duration: "15:45", isWatched: false }
    ]
  },
  
  // Course 6: Node.js API Development
  6: {
    id: 6,
    title: "Node.js API Development",
    description: "Build RESTful APIs with Node.js, Express, and MongoDB. Learn authentication, validation, and best practices.",
    instructor: "Emily Brown",
    instructorAvatar: "/api/placeholder/40/40",
    instructorSubscribers: "112K",
    duration: 5420, // 1:30:20 in seconds
    views: "34.7K",
    likes: 987,
    publishedAt: "2024-02-01",
    thumbnail: "/api/placeholder/320/180",
    playlist: [
      { id: 601, title: "Node.js Setup", duration: "8:30", isWatched: true },
      { id: 602, title: "Express Framework", duration: "12:45", isWatched: true },
      { id: 603, title: "REST API Design", duration: "15:20", isWatched: false }
    ]
  }
};

// Helper function to get video details
export const getVideoDetails = (courseId, videoId) => {
  const course = mockVideos[courseId];
  if (!course) return null;
  
  const video = course.playlist.find(v => v.id === parseInt(videoId));
  if (!video) return null;
  
  return {
    ...video,
    courseTitle: course.title,
    courseInstructor: course.instructor,
    courseDescription: course.description,
    playlist: course.playlist
  };
};