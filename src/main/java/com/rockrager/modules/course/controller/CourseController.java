package com.rockrager.modules.course.controller;

import com.rockrager.modules.course.dto.request.CreateCourseRequest;
import com.rockrager.modules.course.dto.request.UpdateCourseRequest;
import com.rockrager.modules.course.dto.response.CourseDetailResponse;
import com.rockrager.modules.course.dto.response.CourseListResponse;
import com.rockrager.modules.course.dto.response.CourseResponse;
import com.rockrager.modules.course.dto.response.CreateCourseResponse;
import com.rockrager.modules.course.entity.Course;
import com.rockrager.modules.course.service.CourseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @PostMapping
    public ResponseEntity<CreateCourseResponse> createCourse(
            @Valid @RequestBody CreateCourseRequest request,
            @RequestHeader("X-User-Id") String authenticatedUserId) {

        Course createdCourse = courseService.createCourse(request, authenticatedUserId);
        CreateCourseResponse response = mapToCreateResponse(createdCourse);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<CourseListResponse> getAllCourses(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Page<Course> coursePage = courseService.getCourses(page, size);

        List<CourseResponse> courseResponses = coursePage.getContent().stream()
                .map(this::mapToCourseResponse)
                .toList();

        CourseListResponse response = CourseListResponse.builder()
                .courses(courseResponses)
                .total(coursePage.getTotalElements())
                .page(coursePage.getNumber())
                .size(coursePage.getSize())
                .totalPages(coursePage.getTotalPages())
                .hasNext(coursePage.hasNext())
                .hasPrevious(coursePage.hasPrevious())
                .build();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{courseId}")
    public ResponseEntity<CourseDetailResponse> getCourseById(@PathVariable String courseId) {
        Course course = courseService.getCourseById(courseId);
        CourseDetailResponse response = mapToDetailResponse(course);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{courseId}")
    public ResponseEntity<CourseDetailResponse> updateCourse(
            @PathVariable String courseId,
            @RequestBody UpdateCourseRequest request,
            @RequestHeader("X-User-Id") String authenticatedUserId) {

        Course updatedCourse = courseService.updateCourse(courseId, request, authenticatedUserId);
        CourseDetailResponse response = mapToDetailResponse(updatedCourse);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{courseId}")
    public ResponseEntity<Void> deleteCourse(
            @PathVariable String courseId,
            @RequestHeader("X-User-Id") String authenticatedUserId) {

        courseService.deleteCourse(courseId, authenticatedUserId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<CourseResponse>> getCoursesByCategory(@PathVariable String category) {
        List<Course> courses = courseService.getCoursesByCategory(category);
        List<CourseResponse> responses = courses.stream()
                .map(this::mapToCourseResponse)
                .toList();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/level/{level}")
    public ResponseEntity<List<CourseResponse>> getCoursesByLevel(@PathVariable String level) {
        List<Course> courses = courseService.getCoursesByLevel(level);
        List<CourseResponse> responses = courses.stream()
                .map(this::mapToCourseResponse)
                .toList();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/instructor/{instructorId}")
    public ResponseEntity<List<CourseResponse>> getCoursesByInstructor(@PathVariable String instructorId) {
        List<Course> courses = courseService.getCoursesByInstructor(instructorId);
        List<CourseResponse> responses = courses.stream()
                .map(this::mapToCourseResponse)
                .toList();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/featured")
    public ResponseEntity<List<CourseResponse>> getFeaturedCourses() {
        List<Course> courses = courseService.getFeaturedCourses();
        List<CourseResponse> responses = courses.stream()
                .map(this::mapToCourseResponse)
                .toList();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/best-sellers")
    public ResponseEntity<List<CourseResponse>> getBestSellerCourses() {
        List<Course> courses = courseService.getBestSellerCourses();
        List<CourseResponse> responses = courses.stream()
                .map(this::mapToCourseResponse)
                .toList();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/published")
    public ResponseEntity<List<CourseResponse>> getPublishedCourses() {
        List<Course> courses = courseService.getPublishedCourses();
        List<CourseResponse> responses = courses.stream()
                .map(this::mapToCourseResponse)
                .toList();
        return ResponseEntity.ok(responses);
    }

    private CreateCourseResponse mapToCreateResponse(Course course) {
        return CreateCourseResponse.builder()
                .id(course.getId())
                .title(course.getTitle())
                .price(course.getPrice())
                .thumbnailUrl(course.getThumbnailUrl())
                .instructorId(course.getInstructor().getId().toString())
                .instructorName(course.getInstructor().getFullName())
                .build();
    }

    private CourseResponse mapToCourseResponse(Course course) {
        return CourseResponse.builder()
                .id(course.getId())
                .title(course.getTitle())
                .subtitle(course.getSubtitle())
                .price(course.getPrice())
                .isFree(course.getIsFree())
                .thumbnailUrl(course.getThumbnailUrl())
                .instructorId(course.getInstructor().getId().toString())
                .instructorName(course.getInstructor().getFullName())
                .rating(course.getRating())
                .totalStudents(course.getTotalStudents())
                .build();
    }

    private CourseDetailResponse mapToDetailResponse(Course course) {
        return CourseDetailResponse.builder()
                .id(course.getId())
                .title(course.getTitle())
                .subtitle(course.getSubtitle())
                .description(course.getDescription())
                .category(course.getCategory())
                .subcategory(course.getSubcategory())
                .level(course.getLevel())
                .language(course.getLanguage())
                .price(course.getPrice())
                .isFree(course.getIsFree())
                .thumbnailUrl(course.getThumbnailUrl())
                .heroImageUrl(course.getHeroImageUrl())
                .instructorId(course.getInstructor().getId().toString())
                .instructorName(course.getInstructor().getFullName())
                .instructorAvatar(course.getInstructor().getProfileImage())
                .rating(course.getRating())
                .totalStudents(course.getTotalStudents())
                .build();
    }
}