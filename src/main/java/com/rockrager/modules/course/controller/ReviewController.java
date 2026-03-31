package com.rockrager.modules.course.controller;

import com.rockrager.modules.course.dto.request.CreateReviewRequest;
import com.rockrager.modules.course.dto.response.ReviewResponse;
import com.rockrager.modules.course.entity.Review;
import com.rockrager.modules.course.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses/{courseId}/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping
    public ResponseEntity<ReviewResponse> addReview(
            @PathVariable String courseId,
            @Valid @RequestBody CreateReviewRequest request,
            @RequestHeader("X-User-Id") String authenticatedUserId,
            @RequestHeader("X-User-Name") String authenticatedUserName,
            @RequestHeader("X-User-Avatar") String authenticatedUserAvatar) {

        Review savedReview = reviewService.addReview(
                authenticatedUserId,
                authenticatedUserName,
                authenticatedUserAvatar,
                courseId,
                request.getRating(),
                request.getComment()
        );

        ReviewResponse response = mapToResponse(savedReview);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ReviewResponse>> getCourseReviews(@PathVariable String courseId) {
        List<Review> reviews = reviewService.getCourseReviews(courseId);
        List<ReviewResponse> responses = reviews.stream()
                .map(this::mapToResponse)
                .toList();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{reviewId}")
    public ResponseEntity<ReviewResponse> getReviewById(@PathVariable String reviewId) {
        Review review = reviewService.getReviewById(reviewId);
        ReviewResponse response = mapToResponse(review);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/my-review")
    public ResponseEntity<ReviewResponse> getMyReview(
            @PathVariable String courseId,
            @RequestHeader("X-User-Id") String authenticatedUserId) {

        Review review = reviewService.getReviewByUserAndCourse(authenticatedUserId, courseId);
        ReviewResponse response = mapToResponse(review);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<ReviewResponse> updateReview(
            @PathVariable String reviewId,
            @RequestParam(required = false) Integer rating,
            @RequestParam(required = false) String comment,
            @RequestHeader("X-User-Id") String authenticatedUserId) {

        Review updatedReview = reviewService.updateReview(reviewId, rating, comment, authenticatedUserId);
        ReviewResponse response = mapToResponse(updatedReview);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteReview(
            @PathVariable String reviewId,
            @RequestHeader("X-User-Id") String authenticatedUserId) {

        reviewService.deleteReview(reviewId, authenticatedUserId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{reviewId}/helpful")
    public ResponseEntity<Void> markReviewHelpful(@PathVariable String reviewId) {
        reviewService.markReviewHelpful(reviewId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/average-rating")
    public ResponseEntity<Double> getCourseAverageRating(@PathVariable String courseId) {
        double avgRating = reviewService.getCourseAverageRating(courseId);
        return ResponseEntity.ok(avgRating);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getReviewCount(@PathVariable String courseId) {
        long count = reviewService.getReviewCount(courseId);
        return ResponseEntity.ok(count);
    }

    @GetMapping("/has-reviewed")
    public ResponseEntity<Boolean> hasUserReviewed(
            @PathVariable String courseId,
            @RequestHeader("X-User-Id") String authenticatedUserId) {

        boolean hasReviewed = reviewService.hasUserReviewed(authenticatedUserId, courseId);
        return ResponseEntity.ok(hasReviewed);
    }

    private ReviewResponse mapToResponse(Review review) {
        return ReviewResponse.builder()
                .id(review.getId())
                .rating(review.getRating())
                .comment(review.getComment())
                .userId(review.getUserId())
                .userName(review.getUserName())
                .userAvatar(review.getUserAvatar())
                .isVerifiedPurchase(review.getIsVerifiedPurchase())
                .helpfulCount(review.getHelpfulCount())
                .createdAt(review.getCreatedAt() != null ? review.getCreatedAt().toString() : null)
                .build();
    }
}