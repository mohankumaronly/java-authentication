import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from "framer-motion";
import { GraduationCap, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import AuthLayout from "../components/layout/AuthLayout";
import AuthHeader from "../components/auth/AuthHeader";
import SocialAuthButtons from "../components/auth/SocialAuthButtons";
import PasswordField from "../components/auth/PasswordField";
import AuthFooter from "../components/auth/AuthFooter";
import RoleSwitch from "../components/auth/RoleSwitch";
import StatsPreview from "../components/auth/StatsPreview";
import GradientButton from "../components/ui/GradientButton";
import { useDarkMode } from "../hooks/useDarkMode";
import { fadeInUp } from "../constants/animations";
import { STUDENT_STATS } from "../constants/auth";
import AuthService from "../../../services/auth/authApi";

const StudentSignIn = () => {
  useDarkMode();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Check for success message from navigation state (e.g., after signup)
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Clear the location state
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    // Clear errors when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      const response = await AuthService.login(
        {
          email: formData.email,
          password: formData.password
        },
        "STUDENT"
      );

      // Check if email is verified (backend should handle this, but we can check response)
      if (response.message?.includes("verify your email")) {
        setError(response.message);
        return;
      }

      // Login successful
      console.log("Login successful:", response);
      
      // Show success message
      setSuccessMessage("Login successful! Redirecting...");

      // Store remember me preference
      if (formData.rememberMe) {
        localStorage.setItem("rememberMe", "true");
      }

      // Redirect to student dashboard after short delay
      setTimeout(() => {
        navigate("/student-dashboard");
      }, 1500);

    } catch (err) {
      console.error("Login error:", err);
      
      // Handle specific error messages from backend
      if (err.message?.includes("verify your email")) {
        // Show resend verification option
        setError(
          <div>
            <p className="mb-2">{err.message}</p>
            <button
              onClick={handleResendVerification}
              className="text-sm text-blue-600 hover:underline focus:outline-none"
            >
              Resend verification email
            </button>
          </div>
        );
      } else {
        setError(err.message || "Invalid email or password. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    try {
      setIsLoading(true);
      // You'll need to implement this endpoint in your backend
      await AuthService.resendVerificationEmail(formData.email);
      setSuccessMessage("Verification email sent! Please check your inbox.");
    } catch (err) {
      setError("Failed to resend verification email. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Demo login for quick testing (optional)
  const handleDemoLogin = async () => {
    setFormData({
      email: "john.student@test.com",
      password: "password123",
      rememberMe: false
    });
    
    // Auto submit after setting demo credentials
    setTimeout(() => {
      const fakeEvent = { preventDefault: () => {} };
      handleSubmit(fakeEvent);
    }, 100);
  };

  return (
    <AuthLayout>
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
      >
        <AuthHeader
          icon={GraduationCap}
          title="Student Sign In"
          subtitle="Welcome back! Continue your learning journey"
          gradient="from-blue-500 to-blue-600"
        />

        <div className="p-8">
          <SocialAuthButtons />

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Success Message */}
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
            >
              <p className="text-sm text-green-600 dark:text-green-400">{successMessage}</p>
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
            >
              <div className="text-sm text-red-600 dark:text-red-400">{error}</div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl 
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                    focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                    transition-all ${
                      error ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  placeholder="you@example.com"
                  required
                  disabled={isLoading}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <PasswordField
              name="password"
              value={formData.password}
              onChange={handleChange}
              showForgotPassword
              forgotPasswordLink="/forgot-password"
              forgotPasswordColor="blue"
              required
              disabled={isLoading}
              autoComplete="current-password"
            />

            {/* Remember Me and Demo Login */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  disabled={isLoading}
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
              </label>

              {/* Demo Login Button (Optional - remove in production) */}
              <button
                type="button"
                onClick={handleDemoLogin}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline focus:outline-none"
                disabled={isLoading}
              >
                Use Demo Account
              </button>
            </div>

            <GradientButton
              gradient="from-blue-500 to-purple-600"
              isLoading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In as Student"}
            </GradientButton>

            <AuthFooter
              question="Don't have an account?"
              linkText="Sign up as Student"
              linkTo="/student-signup"
              linkColor="blue"
            />
          </form>

          <RoleSwitch
            question="Are you a teacher?"
            linkText="Sign in as Professor"
            linkTo="/professor-signin"
            linkColor="purple"
          />
        </div>
      </motion.div>

      <StatsPreview stats={STUDENT_STATS} color="blue" />
    </AuthLayout>
  );
};

export default StudentSignIn;