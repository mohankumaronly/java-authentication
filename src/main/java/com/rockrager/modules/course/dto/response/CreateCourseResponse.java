package com.rockrager.modules.course.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreateCourseResponse {

    private String id;
    private String title;
    private Double price;
    private String thumbnailUrl;
    private String instructorId;
    private String instructorName;
}