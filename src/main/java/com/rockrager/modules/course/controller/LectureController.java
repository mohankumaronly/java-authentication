package com.rockrager.modules.course.controller;

import com.rockrager.modules.course.dto.request.CreateLectureRequest;
import com.rockrager.modules.course.dto.response.LectureResponse;
import com.rockrager.modules.course.entity.Lecture;
import com.rockrager.modules.course.service.LectureService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses/{courseId}/lectures")
@RequiredArgsConstructor
public class LectureController {

    private final LectureService lectureService;

    @PostMapping
    public ResponseEntity<LectureResponse> createLecture(
            @PathVariable String courseId,
            @Valid @RequestBody CreateLectureRequest request,
            @RequestHeader("X-User-Id") String authenticatedUserId) {

        Lecture lecture = new Lecture();
        lecture.setTitle(request.getTitle());
        lecture.setDescription(request.getDescription());
        lecture.setOrderIndex(request.getOrderIndex());
        lecture.setIsPreview(request.getIsPreview());

        Lecture savedLecture = lectureService.createLecture(courseId, lecture, authenticatedUserId);
        LectureResponse response = mapToResponse(savedLecture);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<LectureResponse>> getLecturesByCourse(@PathVariable String courseId) {
        List<Lecture> lectures = lectureService.getLecturesByCourse(courseId);
        List<LectureResponse> responses = lectures.stream()
                .map(this::mapToResponse)
                .toList();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{lectureId}")
    public ResponseEntity<LectureResponse> getLectureById(
            @PathVariable String courseId,
            @PathVariable String lectureId) {

        Lecture lecture = lectureService.getLectureById(courseId, lectureId);
        LectureResponse response = mapToResponse(lecture);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/first")
    public ResponseEntity<LectureResponse> getFirstLecture(@PathVariable String courseId) {
        Lecture lecture = lectureService.getFirstLecture(courseId);
        LectureResponse response = mapToResponse(lecture);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{currentOrderIndex}/next")
    public ResponseEntity<LectureResponse> getNextLecture(
            @PathVariable String courseId,
            @PathVariable Integer currentOrderIndex) {

        Lecture lecture = lectureService.getNextLecture(courseId, currentOrderIndex);
        if (lecture == null) {
            return ResponseEntity.noContent().build();
        }
        LectureResponse response = mapToResponse(lecture);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{currentOrderIndex}/previous")
    public ResponseEntity<LectureResponse> getPreviousLecture(
            @PathVariable String courseId,
            @PathVariable Integer currentOrderIndex) {

        Lecture lecture = lectureService.getPreviousLecture(courseId, currentOrderIndex);
        if (lecture == null) {
            return ResponseEntity.noContent().build();
        }
        LectureResponse response = mapToResponse(lecture);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/preview")
    public ResponseEntity<List<LectureResponse>> getPreviewLectures(@PathVariable String courseId) {
        List<Lecture> lectures = lectureService.getPreviewLectures(courseId);
        List<LectureResponse> responses = lectures.stream()
                .map(this::mapToResponse)
                .toList();
        return ResponseEntity.ok(responses);
    }

    @PutMapping("/{lectureId}")
    public ResponseEntity<LectureResponse> updateLecture(
            @PathVariable String courseId,
            @PathVariable String lectureId,
            @RequestBody Lecture updatedLecture,
            @RequestHeader("X-User-Id") String authenticatedUserId) {

        Lecture lecture = lectureService.updateLecture(lectureId, updatedLecture, authenticatedUserId);
        LectureResponse response = mapToResponse(lecture);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{lectureId}")
    public ResponseEntity<Void> deleteLecture(
            @PathVariable String courseId,
            @PathVariable String lectureId,
            @RequestHeader("X-User-Id") String authenticatedUserId) {

        lectureService.deleteLecture(lectureId, authenticatedUserId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getLectureCount(@PathVariable String courseId) {
        long count = lectureService.getLectureCount(courseId);
        return ResponseEntity.ok(count);
    }

    private LectureResponse mapToResponse(Lecture lecture) {
        return LectureResponse.builder()
                .id(lecture.getId())
                .title(lecture.getTitle())
                .description(lecture.getDescription())
                .orderIndex(lecture.getOrderIndex())
                .videoUrl(lecture.getVideoUrl())
                .thumbnailUrl(lecture.getThumbnailUrl())
                .duration(lecture.getDuration())
                .isPreview(lecture.getIsPreview())
                .build();
    }
}