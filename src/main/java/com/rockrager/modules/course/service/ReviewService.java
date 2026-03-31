package com.rockrager.modules.course.service;

import com.rockrager.modules.course.entity.Course;
import com.rockrager.modules.course.entity.Review;
import com.rockrager.modules.course.exception.CourseNotFoundException;
import com.rockrager.modules.course.exception.ReviewNotFoundException;
import com.rockrager.modules.course.exception.UnauthorizedException;
import com.rockrager.modules.course.repository.CourseRepository;
import com.rockrager.modules.course.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final CourseRepository courseRepository;

    @Transactional
    public Review addReview(String userId, String userName, String userAvatar,
                            String courseId, Integer rating, String comment) {

        if (reviewRepository.existsByUserIdAndCourseId(userId, courseId)) {
            throw new RuntimeException("You have already reviewed this course");
        }

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new CourseNotFoundException("Course not found with id: " + courseId));

        Review review = new Review();
        review.setUserId(userId);
        review.setUserName(userName);
        review.setUserAvatar(userAvatar);
        review.setCourse(course);
        review.setRating(rating);
        review.setComment(comment);
        review.setIsVerifiedPurchase(true);
        review.setHelpfulCount(0);

        Review savedReview = reviewRepository.save(review);
        updateCourseRating(courseId);

        return savedReview;
    }

    public List<Review> getCourseReviews(String courseId) {
        if (!courseRepository.existsById(courseId)) {
            throw new CourseNotFoundException("Course not found with id: " + courseId);
        }
        return reviewRepository.findByCourseIdOrderByCreatedAtDesc(courseId);
    }

    public Review getReviewById(String reviewId) {
        return reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ReviewNotFoundException("Review not found with id: " + reviewId));
    }

    public Review getReviewByUserAndCourse(String userId, String courseId) {
        return reviewRepository.findByUserIdAndCourseId(userId, courseId)
                .orElseThrow(() -> new ReviewNotFoundException("Review not found for user: " + userId + " and course: " + courseId));
    }

    @Transactional
    public Review updateReview(String reviewId, Integer newRating, String newComment, String authenticatedUserId) {
        Review review = getReviewById(reviewId);

        if (!review.getUserId().equals(authenticatedUserId)) {
            throw new UnauthorizedException("You can only update your own reviews");
        }

        if (newRating != null) {
            review.setRating(newRating);
        }
        if (newComment != null) {
            review.setComment(newComment);
        }

        Review updatedReview = reviewRepository.save(review);
        updateCourseRating(review.getCourse().getId());

        return updatedReview;
    }

    @Transactional
    public void deleteReview(String reviewId, String authenticatedUserId) {
        Review review = getReviewById(reviewId);

        if (!review.getUserId().equals(authenticatedUserId)) {
            throw new UnauthorizedException("You can only delete your own reviews");
        }

        String courseId = review.getCourse().getId();
        reviewRepository.delete(review);
        updateCourseRating(courseId);
    }

    @Transactional
    public void markReviewHelpful(String reviewId) {
        Review review = getReviewById(reviewId);
        review.setHelpfulCount(review.getHelpfulCount() + 1);
        reviewRepository.save(review);
    }

    private void updateCourseRating(String courseId) {
        List<Review> reviews = reviewRepository.findByCourseId(courseId);

        if (reviews.isEmpty()) {
            Course course = courseRepository.findById(courseId)
                    .orElseThrow(() -> new CourseNotFoundException("Course not found with id: " + courseId));
            course.setRating(0.0);
            courseRepository.save(course);
            return;
        }

        double avgRating = reviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0);

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new CourseNotFoundException("Course not found with id: " + courseId));

        course.setRating(avgRating);
        courseRepository.save(course);
    }

    public double getCourseAverageRating(String courseId) {
        List<Review> reviews = reviewRepository.findByCourseId(courseId);
        return reviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0);
    }

    public long getReviewCount(String courseId) {
        return reviewRepository.countByCourseId(courseId);
    }

    public boolean hasUserReviewed(String userId, String courseId) {
        return reviewRepository.existsByUserIdAndCourseId(userId, courseId);
    }
}