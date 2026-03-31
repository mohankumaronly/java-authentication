package com.rockrager.modules.course.controller;

import com.rockrager.modules.course.dto.response.EnrollmentResponse;
import com.rockrager.modules.course.entity.Enrollment;
import com.rockrager.modules.course.service.EnrollmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    @PostMapping("/enroll/{courseId}")
    public ResponseEntity<EnrollmentResponse> enrollInCourse(
            @PathVariable String courseId,
            @RequestHeader("X-User-Id") String authenticatedUserId) {

        Enrollment enrollment = enrollmentService.enrollUser(authenticatedUserId, courseId);
        EnrollmentResponse response = mapToResponse(enrollment);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/user/enrollments")
    public ResponseEntity<List<EnrollmentResponse>> getUserEnrollments(
            @RequestHeader("X-User-Id") String authenticatedUserId) {

        List<Enrollment> enrollments = enrollmentService.getUserEnrollments(authenticatedUserId);
        List<EnrollmentResponse> responses = enrollments.stream()
                .map(this::mapToResponse)
                .toList();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/user/progress/{courseId}")
    public ResponseEntity<EnrollmentResponse> getEnrollmentProgress(
            @RequestHeader("X-User-Id") String authenticatedUserId,
            @PathVariable String courseId) {

        Enrollment enrollment = enrollmentService.getEnrollment(authenticatedUserId, courseId);
        EnrollmentResponse response = mapToResponse(enrollment);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/user/progress/{courseId}")
    public ResponseEntity<EnrollmentResponse> updateProgress(
            @RequestHeader("X-User-Id") String authenticatedUserId,
            @PathVariable String courseId,
            @RequestParam Double progress) {

        Enrollment enrollment = enrollmentService.updateProgress(authenticatedUserId, courseId, progress);
        EnrollmentResponse response = mapToResponse(enrollment);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user/enrolled/{courseId}")
    public ResponseEntity<Boolean> isEnrolled(
            @RequestHeader("X-User-Id") String authenticatedUserId,
            @PathVariable String courseId) {

        boolean enrolled = enrollmentService.isEnrolled(authenticatedUserId, courseId);
        return ResponseEntity.ok(enrolled);
    }

    private EnrollmentResponse mapToResponse(Enrollment enrollment) {
        return EnrollmentResponse.builder()
                .courseId(enrollment.getCourse().getId())
                .courseTitle(enrollment.getCourse().getTitle())
                .thumbnailUrl(enrollment.getCourse().getThumbnailUrl())
                .progressPercentage(enrollment.getProgressPercentage())
                .completed(enrollment.getCompleted())
                .lastLectureId(enrollment.getLastLectureId())
                .lastPosition(enrollment.getLastPosition())
                .build();
    }
}