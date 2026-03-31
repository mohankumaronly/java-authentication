package com.rockrager.modules.course.repository;

import com.rockrager.modules.course.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, String> {

    // 🔹 Get all reviews for a course (for course details page)
    List<Review> findByCourseId(String courseId);

    // 🔹 Get reviews sorted by newest first
    List<Review> findByCourseIdOrderByCreatedAtDesc(String courseId);

    // 🔹 CRITICAL: Prevent duplicate reviews
    // One user can only review a course once
    Optional<Review> findByUserIdAndCourseId(String userId, String courseId);

    // 🔹 Check if user already reviewed (returns true/false)
    // More efficient than findByUserIdAndCourseId().isPresent()
    boolean existsByUserIdAndCourseId(String userId, String courseId);

    // 🔹 Get all reviews by a specific user
    // Used for "My Reviews" page
    List<Review> findByUserId(String userId);

    // 🔹 Get average rating for a course (for course card display)
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.course.id = :courseId")
    Double getAverageRatingByCourseId(@Param("courseId") String courseId);

    // 🔹 Count total reviews for a course
    long countByCourseId(String courseId);

    // 🔹 Get rating distribution (how many 5-star, 4-star, etc.)
    @Query("SELECT r.rating, COUNT(r) FROM Review r WHERE r.course.id = :courseId GROUP BY r.rating")
    List<Object[]> getRatingDistribution(@Param("courseId") String courseId);
}