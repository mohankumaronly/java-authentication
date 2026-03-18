import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from "framer-motion";
import { School, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import AuthHeader from "../components/auth/AuthHeader";
import SocialAuthButtons from "../components/auth/SocialAuthButtons";
import PasswordField from "../components/auth/PasswordField";
import AuthFooter from "../components/auth/AuthFooter";
import RoleSwitch from "../components/auth/RoleSwitch";
import StatsPreview from "../components/auth/StatsPreview";
import GradientButton from "../components/ui/GradientButton";
import { useDarkMode } from "../hooks/useDarkMode";
import { fadeInUp } from "../constants/animations";
import { PROFESSOR_STATS } from "../constants/auth";
import AuthLayout from '../components/layout/AuthLayout';
import AuthService from "../../../services/auth/authApi";

const ProfessorSignIn = () => {
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
  const [fieldErrors, setFieldErrors] = useState({});

  // Check for success message from navigation state (e.g., after signup)
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Pre-fill email if provided
      if (location.state?.email) {
        setFormData(prev => ({ ...prev, email: location.state.email }));
      }
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
    
    // Clear field-specific error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: "" }));
    }
    
    // Clear general error when user starts typing
    if (error) setError("");
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    if (!formData.password) {
      errors.password = "Password is required";
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setError("Please fix the errors below");
      return;
    }

    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const response = await AuthService.login(
        {
          email: formData.email,
          password: formData.password
        },
        "PROFESSOR"
      );

      // Check if email is verified
      if (response.message?.includes("verify your email")) {
        setError(
          <div>
            <p className="mb-2">{response.message}</p>
            <button
              onClick={() => handleResendVerification(formData.email)}
              className="text-sm text-purple-600 hover:underline focus:outline-none"
            >
              Resend verification email
            </button>
          </div>
        );
        return;
      }

      // Check if user has correct role
      if (response.role !== "PROFESSOR") {
        setError("This account is not registered as a professor. Please use the student sign in.");
        return;
      }

      // Login successful
      console.log("Professor login successful:", response);
      
      // Show success message
      setSuccessMessage("Login successful! Redirecting to dashboard...");

      // Store remember me preference
      if (formData.rememberMe) {
        localStorage.setItem("rememberMe", "true");
        localStorage.setItem("savedEmail", formData.email);
      } else {
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("savedEmail");
      }

      // Redirect to professor dashboard after short delay
      setTimeout(() => {
        navigate("/professor-dashboard");
      }, 1500);

    } catch (err) {
      console.error("Login error:", err);
      
      // Handle specific error messages from backend
      if (err.message?.includes("Invalid credentials") || 
          err.message?.includes("email or password")) {
        setError("Invalid email or password. Please try again.");
      } else if (err.message?.includes("verify your email")) {
        setError(
          <div>
            <p className="mb-2">{err.message}</p>
            <button
              onClick={() => handleResendVerification(formData.email)}
              className="text-sm text-purple-600 hover:underline focus:outline-none"
            >
              Resend verification email
            </button>
          </div>
        );
      } else {
        setError(err.message || "Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async (email) => {
    try {
      setIsLoading(true);
      // You'll need to implement this endpoint in your backend
      await AuthService.resendVerificationEmail(email);
      setSuccessMessage("Verification email sent! Please check your inbox.");
    } catch (err) {
      setError("Failed to resend verification email. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Load saved email if remember me was checked
  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    const rememberMe = localStorage.getItem("rememberMe") === "true";
    
    if (savedEmail && rememberMe) {
      setFormData(prev => ({ ...prev, email: savedEmail, rememberMe: true }));
    }
  }, []);

  // Demo login for quick testing (using your test data)
  const handleDemoLogin = () => {
    setFormData({
      email: "jane.professor@university.edu",
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
          icon={School}
          title="Professor Sign In"
          subtitle="Welcome back! Continue shaping young minds"
          gradient="from-purple-500 to-purple-600"
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

          {/* Demo Login Button (Remove in production) */}
          <div className="mb-4 text-right">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="text-xs text-purple-600 dark:text-purple-400 hover:underline focus:outline-none"
              disabled={isLoading}
            >
              Use Demo Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl 
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                    focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400
                    transition-all ${
                      fieldErrors.email 
                        ? 'border-red-500 dark:border-red-500' 
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  placeholder="professor@institution.edu"
                  required
                  disabled={isLoading}
                  autoComplete="email"
                />
              </div>
              {fieldErrors.email && (
                <p className="mt-1 text-xs text-red-500">{fieldErrors.email}</p>
              )}
            </div>

            {/* Password */}
            <PasswordField
              name="password"
              value={formData.password}
              onChange={handleChange}
              showForgotPassword
              forgotPasswordLink="/forgot-password"
              forgotPasswordColor="purple"
              required
              disabled={isLoading}
              autoComplete="current-password"
              error={fieldErrors.password}
            />

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  disabled={isLoading}
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
              </label>

              {/* Forgot Password Link (if not in PasswordField) */}
              <Link
                to="/forgot-password"
                className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <GradientButton
              gradient="from-purple-500 to-pink-500"
              isLoading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In as Professor"}
            </GradientButton>

            <AuthFooter
              question="Don't have an account?"
              linkText="Sign up as Professor"
              linkTo="/professor-signup"
              linkColor="purple"
            />
          </form>

          <RoleSwitch
            question="Are you a student?"
            linkText="Sign in as Student"
            linkTo="/student-signin"
            linkColor="blue"
          />
        </div>
      </motion.div>

      <StatsPreview stats={PROFESSOR_STATS} color="purple" />
    </AuthLayout>
  );
};

export default ProfessorSignIn;