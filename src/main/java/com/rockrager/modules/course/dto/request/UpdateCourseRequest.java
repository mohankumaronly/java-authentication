package com.rockrager.modules.course.dto.request;

import lombok.Data;

@Data
public class UpdateCourseRequest {

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

    private String status;
}