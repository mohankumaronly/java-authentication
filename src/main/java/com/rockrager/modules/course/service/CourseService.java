package com.rockrager.modules.course.service;

import com.rockrager.modules.course.dto.request.CreateCourseRequest;
import com.rockrager.modules.course.dto.request.UpdateCourseRequest;
import com.rockrager.modules.course.entity.Course;
import com.rockrager.modules.course.entity.Enrollment;
import com.rockrager.modules.course.exception.CourseNotFoundException;
import com.rockrager.modules.course.exception.UnauthorizedException;
import com.rockrager.modules.course.repository.CourseRepository;
import com.rockrager.modules.course.repository.EnrollmentRepository;
import com.rockrager.modules.course.repository.LectureRepository;
import com.rockrager.modules.user.entity.User;
import com.rockrager.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CourseService {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final LectureRepository lectureRepository;
    private final EnrollmentRepository enrollmentRepository;

    @Transactional
    public Course createCourse(CreateCourseRequest request, String authenticatedUserId) {
        if (authenticatedUserId == null || authenticatedUserId.isEmpty()) {
            throw new RuntimeException("User ID is required");
        }

        UUID userId;
        try {
            userId = UUID.fromString(authenticatedUserId);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid user ID format: " + authenticatedUserId);
        }

        User instructor = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + authenticatedUserId));

        Course course = new Course();
        course.setTitle(request.getTitle());
        course.setSubtitle(request.getSubtitle());
        course.setDescription(request.getDescription());
        course.setCategory(request.getCategory());
        course.setSubcategory(request.getSubcategory());
        course.setLevel(request.getLevel());
        course.setLanguage(request.getLanguage());
        course.setPrice(request.getPrice());
        course.setIsFree(request.getIsFree() != null ? request.getIsFree() : false);
        course.setThumbnailUrl(request.getThumbnailUrl());
        course.setHeroImageUrl(request.getHeroImageUrl());

        course.setInstructor(instructor);

        course.setRating(0.0);
        course.setTotalReviews(0);
        course.setTotalStudents(0);
        course.setTotalLectures(0);
        course.setIsBestSeller(false);
        course.setIsFeatured(false);
        course.setStatus("draft");

        return courseRepository.save(course);
    }

    public Page<Course> getCourses(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return courseRepository.findAll(pageable);
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course getCourseById(String courseId) {
        return courseRepository.findById(courseId)
                .orElseThrow(() -> new CourseNotFoundException("Course not found with id: " + courseId));
    }

    @Transactional
    public Course updateCourse(String courseId, UpdateCourseRequest request, String authenticatedUserId) {
        Course existingCourse = getCourseById(courseId);

        if (existingCourse.getInstructor() == null || !existingCourse.getInstructor().getId().toString().equals(authenticatedUserId)) {
            throw new UnauthorizedException("You can only update your own courses");
        }

        if (request.getTitle() != null) {
            existingCourse.setTitle(request.getTitle());
        }
        if (request.getSubtitle() != null) {
            existingCourse.setSubtitle(request.getSubtitle());
        }
        if (request.getDescription() != null) {
            existingCourse.setDescription(request.getDescription());
        }
        if (request.getCategory() != null) {
            existingCourse.setCategory(request.getCategory());
        }
        if (request.getSubcategory() != null) {
            existingCourse.setSubcategory(request.getSubcategory());
        }
        if (request.getLevel() != null) {
            existingCourse.setLevel(request.getLevel());
        }
        if (request.getLanguage() != null) {
            existingCourse.setLanguage(request.getLanguage());
        }
        if (request.getPrice() != null) {
            existingCourse.setPrice(request.getPrice());
        }
        if (request.getIsFree() != null) {
            existingCourse.setIsFree(request.getIsFree());
        }
        if (request.getThumbnailUrl() != null) {
            existingCourse.setThumbnailUrl(request.getThumbnailUrl());
        }
        if (request.getHeroImageUrl() != null) {
            existingCourse.setHeroImageUrl(request.getHeroImageUrl());
        }
        if (request.getStatus() != null) {
            existingCourse.setStatus(request.getStatus());
        }

        return courseRepository.save(existingCourse);
    }

    @Transactional
    public void deleteCourse(String courseId, String authenticatedUserId) {
        Course course = getCourseById(courseId);

        if (course.getInstructor() == null || !course.getInstructor().getId().toString().equals(authenticatedUserId)) {
            throw new UnauthorizedException("You can only delete your own courses");
        }

        courseRepository.delete(course);
    }

    public List<Course> getCoursesByCategory(String category) {
        return courseRepository.findByCategory(category);
    }

    public List<Course> getCoursesByLevel(String level) {
        return courseRepository.findByLevel(level);
    }

    public List<Course> getCoursesByInstructor(String instructorId) {
        User instructor = userRepository.findById(UUID.fromString(instructorId))
                .orElseThrow(() -> new RuntimeException("User not found with id: " + instructorId));
        return courseRepository.findByInstructor(instructor);
    }

    public List<Course> getFeaturedCourses() {
        return courseRepository.findByIsFeaturedTrue();
    }

    public List<Course> getBestSellerCourses() {
        return courseRepository.findByIsBestSellerTrue();
    }

    public List<Course> getPublishedCourses() {
        return courseRepository.findByStatus("published");
    }

    @Transactional
    public void updateCourseStats(String courseId) {
        Course course = getCourseById(courseId);

        long lectureCount = lectureRepository.countByCourseId(courseId);
        List<Enrollment> enrollments = enrollmentRepository.findByCourseId(courseId);

        course.setTotalLectures((int) lectureCount);
        course.setTotalStudents(enrollments.size());

        courseRepository.save(course);
    }
}