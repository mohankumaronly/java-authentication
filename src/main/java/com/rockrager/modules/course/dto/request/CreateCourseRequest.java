package com.rockrager.modules.course.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateCourseRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String subtitle;

    @NotBlank(message = "Description is required")
    private String description;

    private String category;
    private String subcategory;
    private String level;
    private String language;

    @NotNull(message = "Price is required")
    private Double price;

    private Boolean isFree;

    private String thumbnailUrl;
    private String heroImageUrl;
}