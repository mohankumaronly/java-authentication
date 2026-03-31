package com.rockrager.modules.course.service;

import com.rockrager.modules.course.entity.Course;
import com.rockrager.modules.course.entity.Lecture;
import com.rockrager.modules.course.exception.CourseNotFoundException;
import com.rockrager.modules.course.exception.LectureNotFoundException;
import com.rockrager.modules.course.exception.UnauthorizedException;
import com.rockrager.modules.course.repository.CourseRepository;
import com.rockrager.modules.course.repository.LectureRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LectureService {

    private final LectureRepository lectureRepository;
    private final CourseRepository courseRepository;

    @Transactional
    public Lecture createLecture(String courseId, Lecture lecture, String authenticatedUserId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new CourseNotFoundException("Course not found with id: " + courseId));

        if (!course.getInstructor().getId().toString().equals(authenticatedUserId)) {
            throw new UnauthorizedException("Only course instructor can add lectures");
        }

        lecture.setCourse(course);

        if (lecture.getOrderIndex() == null) {
            long lectureCount = lectureRepository.countByCourseId(courseId);
            lecture.setOrderIndex((int) lectureCount + 1);
        }

        return lectureRepository.save(lecture);
    }

    public List<Lecture> getLecturesByCourse(String courseId) {
        if (!courseRepository.existsById(courseId)) {
            throw new CourseNotFoundException("Course not found with id: " + courseId);
        }
        return lectureRepository.findByCourseIdOrderByOrderIndexAsc(courseId);
    }

    public Lecture getLectureById(String courseId, String lectureId) {
        return lectureRepository.findByCourseIdAndId(courseId, lectureId)
                .orElseThrow(() -> new LectureNotFoundException(
                        "Lecture not found with id: " + lectureId + " in course: " + courseId));
    }

    public Lecture getFirstLecture(String courseId) {
        return lectureRepository.findFirstByCourseIdOrderByOrderIndexAsc(courseId)
                .orElseThrow(() -> new LectureNotFoundException("No lectures found for course: " + courseId));
    }

    public Lecture getNextLecture(String courseId, Integer currentOrderIndex) {
        return lectureRepository
                .findFirstByCourseIdAndOrderIndexGreaterThanOrderByOrderIndexAsc(courseId, currentOrderIndex)
                .orElse(null);
    }

    public Lecture getPreviousLecture(String courseId, Integer currentOrderIndex) {
        return lectureRepository
                .findFirstByCourseIdAndOrderIndexLessThanOrderByOrderIndexDesc(courseId, currentOrderIndex)
                .orElse(null);
    }

    public List<Lecture> getPreviewLectures(String courseId) {
        return lectureRepository.findByCourseIdAndIsPreviewTrue(courseId);
    }

    @Transactional
    public void deleteLecture(String lectureId, String authenticatedUserId) {
        Lecture lecture = lectureRepository.findById(lectureId)
                .orElseThrow(() -> new LectureNotFoundException("Lecture not found with id: " + lectureId));

        Course course = lecture.getCourse();
        if (!course.getInstructor().getId().toString().equals(authenticatedUserId)) {
            throw new UnauthorizedException("Only course instructor can delete lectures");
        }

        lectureRepository.delete(lecture);
    }

    @Transactional
    public Lecture updateLecture(String lectureId, Lecture updatedLecture, String authenticatedUserId) {
        Lecture existingLecture = lectureRepository.findById(lectureId)
                .orElseThrow(() -> new LectureNotFoundException("Lecture not found with id: " + lectureId));

        Course course = existingLecture.getCourse();
        if (!course.getInstructor().getId().toString().equals(authenticatedUserId)) {
            throw new UnauthorizedException("Only course instructor can update lectures");
        }

        if (updatedLecture.getTitle() != null) {
            existingLecture.setTitle(updatedLecture.getTitle());
        }
        if (updatedLecture.getDescription() != null) {
            existingLecture.setDescription(updatedLecture.getDescription());
        }
        if (updatedLecture.getVideoUrl() != null) {
            existingLecture.setVideoUrl(updatedLecture.getVideoUrl());
        }
        if (updatedLecture.getVideoPublicId() != null) {
            existingLecture.setVideoPublicId(updatedLecture.getVideoPublicId());
        }
        if (updatedLecture.getThumbnailUrl() != null) {
            existingLecture.setThumbnailUrl(updatedLecture.getThumbnailUrl());
        }
        if (updatedLecture.getDuration() != null) {
            existingLecture.setDuration(updatedLecture.getDuration());
        }
        if (updatedLecture.getIsPreview() != null) {
            existingLecture.setIsPreview(updatedLecture.getIsPreview());
        }
        if (updatedLecture.getOrderIndex() != null) {
            existingLecture.setOrderIndex(updatedLecture.getOrderIndex());
        }

        return lectureRepository.save(existingLecture);
    }

    public long getLectureCount(String courseId) {
        return lectureRepository.countByCourseId(courseId);
    }
}