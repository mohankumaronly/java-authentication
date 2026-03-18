import { Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { School, Mail, User, BookOpen } from "lucide-react";
import { useState } from "react";
import AuthLayout from "../components/layout/AuthLayout";
import AuthHeader from "../components/auth/AuthHeader";
import SocialAuthButtons from "../components/auth/SocialAuthButtons";
import PasswordField from "../components/auth/PasswordField";
import PasswordStrengthIndicator from "../components/auth/PasswordStrengthIndicator";
import AuthFooter from "../components/auth/AuthFooter";
import RoleSwitch from "../components/auth/RoleSwitch";
import GradientButton from "../components/ui/GradientButton";
import { useDarkMode } from "../hooks/useDarkMode";
import { fadeInUp } from "../constants/animations";
import { EXPERTISE_OPTIONS } from "../constants/auth";
import AuthService from "../../../services/auth/authApi";

const ProfessorSignUp = () => {
  useDarkMode();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    institution: "",
    expertise: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

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
    
    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required";
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    
    if (!formData.institution.trim()) {
      errors.institution = "Institution name is required";
    }
    
    if (!formData.expertise) {
      errors.expertise = "Please select your area of expertise";
    }
    
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords don't match";
    }
    
    if (!formData.agreeTerms) {
      errors.agreeTerms = "You must agree to the Terms of Service";
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
      const response = await AuthService.professorRegister({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        instituteName: formData.institution, // Note: backend expects 'instituteName'
        areaOfExpertise: formData.expertise
      });

      setSuccessMessage(
        response.message || 
        "Registration successful! Please check your email for verification link."
      );
      
      // Clear form
      setFormData({
        fullName: "",
        email: "",
        institution: "",
        expertise: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false
      });

      // Redirect to sign in after 3 seconds
      setTimeout(() => {
        navigate("/professor-signin", { 
          state: { 
            message: "Registration successful! Please verify your email before logging in.",
            email: formData.email 
          } 
        });
      }, 3000);

    } catch (err) {
      console.error("Registration error:", err);
      
      // Handle specific error messages
      if (err.message?.includes("already registered")) {
        setError("This email is already registered. Please use a different email or try logging in.");
      } else if (err.message?.includes("Institute name is required")) {
        setFieldErrors(prev => ({ ...prev, institution: "Institute name is required" }));
        setError("Please fill in all required fields");
      } else {
        setError(err.message || "Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Quick fill demo data for testing (optional)
  const handleDemoFill = () => {
    setFormData({
      fullName: "Dr. Jane Professor",
      email: "jane.professor@university.edu",
      institution: "Tech University",
      expertise: "computer-science",
      password: "password123",
      confirmPassword: "password123",
      agreeTerms: true
    });
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
          title="Create Professor Account"
          subtitle="Join our community of educators"
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
                Or sign up with email
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
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </motion.div>
          )}

          {/* Demo Fill Button (Remove in production) */}
          <div className="mb-4 text-right">
            <button
              type="button"
              onClick={handleDemoFill}
              className="text-xs text-purple-600 dark:text-purple-400 hover:underline focus:outline-none"
              disabled={isLoading}
            >
              Fill Demo Data
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl 
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                    focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400
                    transition-all ${
                      fieldErrors.fullName 
                        ? 'border-red-500 dark:border-red-500' 
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  placeholder="Dr. Jane Smith"
                  required
                  disabled={isLoading}
                />
              </div>
              {fieldErrors.fullName && (
                <p className="mt-1 text-xs text-red-500">{fieldErrors.fullName}</p>
              )}
            </div>

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
                />
              </div>
              {fieldErrors.email && (
                <p className="mt-1 text-xs text-red-500">{fieldErrors.email}</p>
              )}
            </div>

            {/* Institution */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Institution/Organization <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl 
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                    focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400
                    transition-all ${
                      fieldErrors.institution 
                        ? 'border-red-500 dark:border-red-500' 
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  placeholder="University or School Name"
                  required
                  disabled={isLoading}
                />
              </div>
              {fieldErrors.institution && (
                <p className="mt-1 text-xs text-red-500">{fieldErrors.institution}</p>
              )}
            </div>

            {/* Area of Expertise */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Area of Expertise <span className="text-red-500">*</span>
              </label>
              <select
                name="expertise"
                value={formData.expertise}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-xl 
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                  focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400
                  transition-all ${
                    fieldErrors.expertise 
                      ? 'border-red-500 dark:border-red-500' 
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                required
                disabled={isLoading}
              >
                <option value="">Select your expertise</option>
                {EXPERTISE_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {fieldErrors.expertise && (
                <p className="mt-1 text-xs text-red-500">{fieldErrors.expertise}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <PasswordField
                name="password"
                value={formData.password}
                onChange={handleChange}
                label="Password"
                required
                minLength={8}
                disabled={isLoading}
                error={fieldErrors.password}
              />
              <PasswordStrengthIndicator password={formData.password} />
            </div>

            {/* Confirm Password */}
            <PasswordField
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              label="Confirm Password"
              required
              disabled={isLoading}
              error={fieldErrors.confirmPassword}
            />

            {/* Terms and Conditions */}
            <div>
              <label className={`flex items-start gap-2 ${fieldErrors.agreeTerms ? 'text-red-500' : ''}`}>
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="w-4 h-4 mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  required
                  disabled={isLoading}
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  I agree to the{" "}
                  <Link to="/terms" className="text-purple-600 dark:text-purple-400 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-purple-600 dark:text-purple-400 hover:underline">
                    Privacy Policy
                  </Link>
                  <span className="text-red-500">*</span>
                </span>
              </label>
            </div>

            <GradientButton
              gradient="from-purple-500 to-pink-500"
              isLoading={isLoading}
              disabled={!formData.agreeTerms || isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Professor Account"}
            </GradientButton>

            <AuthFooter
              question="Already have an account?"
              linkText="Sign in"
              linkTo="/professor-signin"
              linkColor="purple"
            />
          </form>

          <RoleSwitch
            question="Are you a student?"
            linkText="Sign up as Student"
            linkTo="/student-signup"
            linkColor="blue"
          />
        </div>
      </motion.div>
    </AuthLayout>
  );
};

export default ProfessorSignUp;