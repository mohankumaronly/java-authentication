import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronLeft, Star, Users, Clock, BookOpen, Play, Award,
  User, GraduationCap, Briefcase, Calendar, CheckCircle,
  Shield, CreditCard, Download, Monitor, MessageCircle,
  ChevronRight, ShoppingCart, Heart, Share2, Info,
  FileText, Video, Code, Trophy, Zap, Globe, Target
} from 'lucide-react';
import { useDarkMode } from '../../hooks/useDarkMode';

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  useEffect(() => {
    // Mock course data
    const fetchCourse = async () => {
      const mockCourse = {
        id: courseId,
        title: "Complete C++ DSA Course: From Beginner to Advanced",
        subtitle: "Master Data Structures & Algorithms with C++ - Crack Coding Interviews at FAANG Companies",
        description: `This comprehensive course is designed to take you from a complete beginner to an advanced level in Data Structures and Algorithms using C++. With over 100+ hours of content, 200+ coding exercises, and 50+ real-world projects, this course is your one-stop solution for mastering DSA.

What makes this course unique?
- Industry-relevant curriculum designed by experts from Google and Amazon
- Practical approach with real coding problems from top tech companies
- Comprehensive coverage of all DSA topics with in-depth explanations
- Regular updates with new content and interview questions
- Lifetime access to all course materials and future updates

By the end of this course, you'll be able to:
- Solve complex coding problems with confidence
- Ace technical interviews at top tech companies
- Build efficient algorithms for real-world applications
- Understand the fundamentals of computer science deeply`,
        
        instructor: {
          name: "Shradha Khapra",
          title: "Senior Software Engineer at Google | Ex-Microsoft",
          avatar: "https://ui-avatars.com/api/?name=Shradha+Khapra&background=3b82f6&color=fff",
          bio: "Shradha Khapra is a Senior Software Engineer at Google with 8+ years of experience in software development. She has worked at Microsoft and Amazon before joining Google. She holds a Master's degree in Computer Science from Stanford University and has trained over 500,000 students globally.",
          experience: "8+ years in Software Development",
          company: "Google",
          previousCompanies: ["Microsoft", "Amazon"],
          education: "M.S. in Computer Science, Stanford University",
          students: "500,000+",
          courses: 12,
          rating: 4.9,
          reviews: 18450,
          expertise: ["Data Structures", "Algorithms", "C++", "System Design", "Interview Preparation"]
        },
        
        pricing: {
          originalPrice: 199.99,
          currentPrice: 49.99,
          discount: "75% OFF",
          currency: "USD"
        },
        
        stats: {
          totalStudents: "145,678",
          totalLectures: 1, // Changed to 1 since there's only one video
          totalDuration: "85 hours",
          level: "Beginner to Advanced",
          language: "English",
          lastUpdated: "January 2026"
        },
        
        features: [
          "85+ hours of on-demand video",
          "200+ coding exercises",
          "50+ downloadable resources",
          "Certificate of completion",
          "Full lifetime access",
          "Access on mobile and TV",
          "Assignments and quizzes",
          "Interview preparation guide"
        ],
        
        whatYouWillLearn: [
          "Master Data Structures (Arrays, Linked Lists, Trees, Graphs, etc.)",
          "Learn Algorithm Analysis and Complexity (Big O notation)",
          "Understand Sorting and Searching algorithms",
          "Master Dynamic Programming and Greedy Algorithms",
          "Solve 500+ coding problems from top companies",
          "Prepare for FAANG and top tech interviews",
          "Build real-world projects using DSA concepts",
          "Optimize code for performance and scalability"
        ],
        
        requirements: [
          "Basic understanding of any programming language",
          "A computer with internet connection",
          "Eagerness to learn and practice coding",
          "No prior DSA knowledge required"
        ],
        
        targetAudience: [
          "Students preparing for coding interviews",
          "Software developers wanting to improve problem-solving skills",
          "College students pursuing computer science",
          "Self-taught programmers looking to build strong fundamentals",
          "Anyone interested in mastering Data Structures & Algorithms"
        ],
        
        reviews: [
          {
            id: 1,
            name: "Rahul Sharma",
            avatar: "https://ui-avatars.com/api/?name=Rahul+Sharma&background=10b981&color=fff",
            rating: 5,
            date: "January 2026",
            comment: "This is the best DSA course I've ever taken! Shradha explains complex concepts in such a simple way. The coding exercises are challenging and really help build confidence. Landed a job at Amazon after completing this course!",
            helpful: 245
          },
          {
            id: 2,
            name: "Priya Patel",
            avatar: "https://ui-avatars.com/api/?name=Priya+Patel&background=8b5cf6&color=fff",
            rating: 5,
            date: "December 2025",
            comment: "Excellent course structure and teaching methodology. The instructor is very knowledgeable and patient. The assignments and quizzes helped me test my understanding. Highly recommended for anyone serious about DSA.",
            helpful: 178
          },
          {
            id: 3,
            name: "Amit Kumar",
            avatar: "https://ui-avatars.com/api/?name=Amit+Kumar&background=f59e0b&color=fff",
            rating: 4.5,
            date: "December 2025",
            comment: "Great course content and practice problems. The only reason for 4.5 stars is that some advanced topics could use more examples. Overall, very satisfied with the learning experience.",
            helpful: 92
          }
        ],
        
        faqs: [
          {
            question: "How long do I have access to the course?",
            answer: "You get lifetime access to the course once enrolled. You can access it anytime, anywhere, and on any device."
          },
          {
            question: "Is there a certificate after completion?",
            answer: "Yes, you'll receive a verified certificate of completion that you can add to your LinkedIn profile and resume."
          },
          {
            question: "What if I'm not satisfied with the course?",
            answer: "We offer a 30-day money-back guarantee. If you're not satisfied, you can get a full refund within 30 days of purchase."
          },
          {
            question: "Do I need prior programming experience?",
            answer: "Basic understanding of any programming language is helpful but not mandatory. We start from the very basics."
          }
        ]
      };
      
      setCourse(mockCourse);
    };
    
    fetchCourse();
  }, [courseId]);

  const handleEnroll = () => {
    setShowPurchaseModal(true);
  };

  const confirmPurchase = () => {
    setIsEnrolled(true);
    setShowPurchaseModal(false);
    // Navigate to the single video lecture
    navigate(`/course/${courseId}/video/1`);
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading course details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2 text-white/90 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-lg text-white/90 mb-6">{course.subtitle}</p>
              
              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-current text-yellow-400" />
                  <span className="font-semibold">{course.instructor.rating}</span>
                  <span className="text-white/70">({course.instructor.reviews.toLocaleString()} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{course.stats.totalStudents} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{course.stats.totalDuration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  <span>Single Lecture Course</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold">${course.pricing.currentPrice}</span>
                  <span className="text-xl line-through text-white/60">${course.pricing.originalPrice}</span>
                  <span className="bg-green-500 text-white px-2 py-1 rounded text-sm font-semibold">
                    {course.pricing.discount}
                  </span>
                </div>
                
                {!isEnrolled ? (
                  <button
                    onClick={handleEnroll}
                    className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Enroll Now
                  </button>
                ) : (
                  <Link
                    to={`/course/${courseId}/video/1`}
                    className="px-8 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center gap-2"
                  >
                    <Play className="w-5 h-5" />
                    Start Learning
                  </Link>
                )}
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">This course includes:</h3>
              <div className="space-y-3">
                {course.features.slice(0, 6).map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar - Tabs */}
          <div className="w-64 flex-shrink-0">
            <div className="sticky top-4 space-y-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                  activeTab === 'overview'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Info className="w-5 h-5" />
                <span>Overview</span>
              </button>
              <button
                onClick={() => setActiveTab('instructor')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                  activeTab === 'instructor'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <User className="w-5 h-5" />
                <span>Instructor</span>
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                  activeTab === 'reviews'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Star className="w-5 h-5" />
                <span>Reviews</span>
              </button>
              <button
                onClick={() => setActiveTab('faq')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                  activeTab === 'faq'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <MessageCircle className="w-5 h-5" />
                <span>FAQ</span>
              </button>
            </div>
          </div>
          
          {/* Right Content */}
          <div className="flex-1">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Course Preview Section */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Play className="w-6 h-6 text-blue-600" />
                    Course Preview
                  </h2>
                  <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
                    <img 
                      src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3" 
                      alt="Course Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Watch a preview of this comprehensive course. Get a glimpse of what you'll learn and how the instructor teaches.
                  </p>
                </div>

                {/* Description */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Course Description</h2>
                  <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {course.description}
                  </p>
                </div>
                
                {/* What You'll Learn */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Target className="w-6 h-6 text-blue-600" />
                    What You'll Learn
                  </h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    {course.whatYouWillLearn.map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Requirements */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Zap className="w-6 h-6 text-yellow-500" />
                    Requirements
                  </h2>
                  <div className="space-y-2">
                    {course.requirements.map((req, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <ChevronRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Target Audience */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Users className="w-6 h-6 text-purple-600" />
                    Target Audience
                  </h2>
                  <div className="space-y-2">
                    {course.targetAudience.map((audience, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <ChevronRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{audience}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Instructor Tab */}
            {activeTab === 'instructor' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
              >
                <div className="flex items-start gap-6 mb-6">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="w-24 h-24 rounded-full"
                  />
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{course.instructor.name}</h2>
                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">{course.instructor.title}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {course.instructor.students} students
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        {course.instructor.rating} rating
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {course.instructor.courses} courses
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">About the Instructor</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{course.instructor.bio}</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 pt-4">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Current Company</p>
                        <p className="font-medium text-gray-900 dark:text-white">{course.instructor.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Experience</p>
                        <p className="font-medium text-gray-900 dark:text-white">{course.instructor.experience}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Education</p>
                        <p className="font-medium text-gray-900 dark:text-white">{course.instructor.education}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Previous Experience</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {course.instructor.previousCompanies.join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {course.instructor.expertise.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Rating Summary */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-gray-900 dark:text-white">{course.instructor.rating}</div>
                      <div className="flex items-center justify-center gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
                        ))}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {course.instructor.reviews.toLocaleString()} reviews
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Individual Reviews */}
                {course.reviews.map((review) => (
                  <div key={review.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                      <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{review.name}</h4>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < Math.floor(review.rating) ? 'fill-current text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
                          ))}
                          <span className="text-sm text-gray-500 ml-2">{review.rating}</span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mb-3">{review.comment}</p>
                        <button className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                          Helpful ({review.helpful})
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
            
            {/* FAQ Tab */}
            {activeTab === 'faq' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {course.faqs.map((faq, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{faq.question}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
      
      {/* Purchase Modal */}
      {showPurchaseModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Confirm Enrollment</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Course Price</span>
                <span className="font-semibold text-gray-900 dark:text-white">${course.pricing.currentPrice}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Tax (GST)</span>
                <span className="font-semibold text-gray-900 dark:text-white">$0.00</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                <span className="text-xl font-bold text-blue-600">${course.pricing.currentPrice}</span>
              </div>
            </div>
            <div className="space-y-3">
              <button
                onClick={confirmPurchase}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Confirm Purchase
              </button>
              <button
                onClick={() => setShowPurchaseModal(false)}
                className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CourseDetailsPage;