package com.rockrager.modules.course.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CourseResponse {

    private String id;
    private String title;
    private String subtitle;

    private Double price;
    private Boolean isFree;

    private String thumbnailUrl;

    private String instructorId;
    private String instructorName;

    private Double rating;
    private Integer totalStudents;
}