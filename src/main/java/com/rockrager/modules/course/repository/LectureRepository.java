package com.rockrager.modules.course.repository;

import com.rockrager.modules.course.entity.Lecture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface LectureRepository extends JpaRepository<Lecture, String> {

    // 🔹 MOST IMPORTANT: Get all lectures in correct order
    // This ensures videos play in sequence (1,2,3,4...)
    List<Lecture> findByCourseIdOrderByOrderIndexAsc(String courseId);

    // 🔹 Get a specific lecture from a course
    // Used for video player page
    Optional<Lecture> findByCourseIdAndId(String courseId, String lectureId);

    // 🔹 Get only preview lectures (free to watch without enrollment)
    // Used for marketing and course previews
    List<Lecture> findByCourseIdAndIsPreviewTrue(String courseId);

    // 🔹 Get next lecture for "Next Video" button
    // Very important for player navigation
    Optional<Lecture> findFirstByCourseIdAndOrderIndexGreaterThanOrderByOrderIndexAsc(
            String courseId, Integer currentOrderIndex
    );

    // 🔹 Get previous lecture for "Previous Video" button
    Optional<Lecture> findFirstByCourseIdAndOrderIndexLessThanOrderByOrderIndexDesc(
            String courseId, Integer currentOrderIndex
    );

    // 🔹 Get first lecture (auto-play when user starts course)
    Optional<Lecture> findFirstByCourseIdOrderByOrderIndexAsc(String courseId);

    // 🔹 Count total lectures in a course
    // Used for progress calculation
    long countByCourseId(String courseId);
}