package com.rockrager.modules.course.service;

import com.rockrager.modules.course.entity.Course;
import com.rockrager.modules.course.entity.Enrollment;
import com.rockrager.modules.course.exception.EnrollmentException;
import com.rockrager.modules.course.repository.CourseRepository;
import com.rockrager.modules.course.repository.EnrollmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final CourseRepository courseRepository;

    // 🔹 ENROLL USER IN COURSE
    @Transactional
    public Enrollment enrollUser(String userId, String courseId) {

        // ❌ Prevent duplicate enrollment (CRITICAL)
        if (enrollmentRepository.findByUserIdAndCourseId(userId, courseId).isPresent()) {
            throw new EnrollmentException("User is already enrolled in this course");
        }

        // ✅ Get course (must exist)
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new EnrollmentException("Course not found with id: " + courseId));

        // ✅ Create enrollment with default values
        Enrollment enrollment = new Enrollment();
        enrollment.setUserId(userId);
        enrollment.setCourse(course);
        enrollment.setProgressPercentage(0.0);
        enrollment.setCompleted(false);

        return enrollmentRepository.save(enrollment);
    }

    // 🔹 GET ALL ENROLLMENTS OF A USER
    public List<Enrollment> getUserEnrollments(String userId) {
        return enrollmentRepository.findByUserId(userId);
    }

    // 🔹 GET SPECIFIC ENROLLMENT
    public Enrollment getEnrollment(String userId, String courseId) {
        return enrollmentRepository.findByUserIdAndCourseId(userId, courseId)
                .orElseThrow(() -> new EnrollmentException("Enrollment not found for user: " + userId + " and course: " + courseId));
    }

    // 🔹 UPDATE PROGRESS PERCENTAGE
    @Transactional
    public Enrollment updateProgress(String userId, String courseId, Double progress) {
        Enrollment enrollment = getEnrollment(userId, courseId);

        enrollment.setProgressPercentage(progress);

        // ✅ Auto-mark complete when progress reaches 100%
        if (progress >= 100.0 && !enrollment.getCompleted()) {
            enrollment.setCompleted(true);
        }

        return enrollmentRepository.save(enrollment);
    }

    // 🔹 CHECK IF USER IS ENROLLED
    public boolean isEnrolled(String userId, String courseId) {
        return enrollmentRepository.findByUserIdAndCourseId(userId, courseId).isPresent();
    }
}