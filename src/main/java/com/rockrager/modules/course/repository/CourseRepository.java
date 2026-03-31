package com.rockrager.modules.course.repository;

import com.rockrager.modules.course.entity.Course;
import com.rockrager.modules.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, String> {

    List<Course> findByCategory(String category);

    List<Course> findByLevel(String level);

    List<Course> findByInstructor(User instructor);

    List<Course> findByIsFeaturedTrue();

    List<Course> findByIsBestSellerTrue();

    List<Course> findByStatus(String status);

    Page<Course> findByStatus(String status, Pageable pageable);
}