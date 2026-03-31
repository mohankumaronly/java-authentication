package com.rockrager.modules.course.repository;

import com.rockrager.modules.course.entity.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, String> {

    // 🔹 CRITICAL: Prevent duplicate enrollment
    // Checks if a specific user is already enrolled in a specific course
    Optional<Enrollment> findByUserIdAndCourseId(String userId, String courseId);

    // 🔹 Get all courses a user is enrolled in
    // Used for "My Courses" page and user dashboard
    List<Enrollment> findByUserId(String userId);

    // 🔹 Get all students enrolled in a course
    // Used for course analytics and instructor dashboard
    List<Enrollment> findByCourseId(String courseId);

    // 🔹 Check if enrollment exists (returns true/false)
    // More efficient than findByUserIdAndCourseId().isPresent()
    boolean existsByUserIdAndCourseId(String userId, String courseId);
}