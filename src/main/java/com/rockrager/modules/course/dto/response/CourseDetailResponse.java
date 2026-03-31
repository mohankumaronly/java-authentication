package com.rockrager.modules.course.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CourseDetailResponse {

    private String id;
    private String title;
    private String subtitle;
    private String description;

    private String category;
    private String subcategory;
    private String level;
    private String language;

    private Double price;
    private Boolean isFree;

    private String thumbnailUrl;
    private String heroImageUrl;

    private String instructorId;
    private String instructorName;
    private String instructorAvatar;

    private Double rating;
    private Integer totalStudents;
}