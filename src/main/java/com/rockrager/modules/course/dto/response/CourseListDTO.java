package com.rockrager.modules.course.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CourseListDTO {

    // 🔹 Basic Info (minimal for card display)
    private String id;
    private String title;
    private String description;

    // 🔹 Pricing
    private Double price;
    private Double originalPrice;
    private Boolean isFree;

    // 🔹 Images
    private String thumbnailUrl;

    // 🔹 Instructor (minimal)
    private String instructorId;
    private String instructorName;
    private String instructorAvatar;

    // 🔹 Stats (for social proof)
    private Double rating;
    private Integer totalReviews;
    private Integer totalStudents;
    private String totalDuration;

    // 🔹 Flags
    private Boolean isBestSeller;
    private Boolean isFeatured;
    private String level;
}