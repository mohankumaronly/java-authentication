import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/landing/LandingPage';
import RoleSelection from '../pages/RoleSelectionPage/RoleSelection';
import StudentSignIn from '../pages/auth/StudentAuth/StudentSignIn';
import StudentSignUp from '../pages/auth/StudentAuth/StudentSignUp';
import ProfessorSignUp from '../pages/auth/professorSignInAuth/ProfessorSignUp';
import ProfessorSignIn from '../pages/auth/professorSignInAuth/ProfessorSignIn';
import StudentDashboard from '../pages/studentDashboard/StudentDashboard';
import ProfessorDashboard from '../pages/professorDashboard/ProfessorDashboard';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Main landing page route */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/get-started" element={<RoleSelection />} />

       {/* Student Routes */}
      <Route path="/student-signin" element={<StudentSignIn />} />
      <Route path="/student-signup" element={<StudentSignUp />} />
      
      {/* Professor Routes */}
      <Route path="/professor-signin" element={<ProfessorSignIn />} />
      <Route path="/professor-signup" element={<ProfessorSignUp />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/professor-dashboard" element={<ProfessorDashboard />} />
    </Routes>
  );
};

export default AppRoutes;