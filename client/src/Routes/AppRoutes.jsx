import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import LandingPage from "../pages/landing/LandingPage";
import RoleSelection from "../pages/RoleSelectionPage/RoleSelection";
import SignIn from "../pages/auth/SignIn"; 
import StudentSignUp from "../pages/auth/studentAuth/StudentSignUp";
import ProfessorSignUp from "../pages/auth/professorSignInAuth/ProfessorSignUp";
import StudentDashboard from "../pages/studentDashboard/StudentDashboard";
import ProfessorDashboard from "../pages/professorDashboard/ProfessorDashboard";
import Unauthorized from "../pages/Unauthorized";

const AppRoutes = () => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  const AuthRedirect = ({ children }) => {
    if (isAuthenticated) {
      if (user?.role === "STUDENT") {
        return <Navigate to="/student-dashboard" replace />;
      }
      if (user?.role === "PROFESSOR") {
        return <Navigate to="/professor-dashboard" replace />;
      }
    }
    return children;
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/get-started" element={<RoleSelection />} />
      <Route path="/role-selection" element={<RoleSelection />} />
      
      <Route 
        path="/signin" 
        element={
          <AuthRedirect>
            <SignIn />
          </AuthRedirect>
        } 
      />
      
      <Route path="/student-signin" element={<Navigate to="/signin" replace />} />
      <Route path="/professor-signin" element={<Navigate to="/signin" replace />} />
      
      <Route 
        path="/student-signup" 
        element={
          <AuthRedirect>
            <StudentSignUp />
          </AuthRedirect>
        } 
      />
      <Route 
        path="/professor-signup" 
        element={
          <AuthRedirect>
            <ProfessorSignUp />
          </AuthRedirect>
        } 
      />
      
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <div>Profile Page (Coming Soon)</div>
          </ProtectedRoute>
        }
      />

      <Route
        path="/student-dashboard"
        element={
          <RoleRoute role="STUDENT">
            <StudentDashboard />
          </RoleRoute>
        }
      />

      <Route
        path="/professor-dashboard"
        element={
          <RoleRoute role="PROFESSOR">
            <ProfessorDashboard />
          </RoleRoute>
        }
      />

      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;