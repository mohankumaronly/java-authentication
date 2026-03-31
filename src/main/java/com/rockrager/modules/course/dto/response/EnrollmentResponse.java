package com.rockrager.modules.course.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EnrollmentResponse {

    private String courseId;
    private String courseTitle;
    private String thumbnailUrl;

    private Double progressPercentage;
    private Boolean completed;

    private String lastLectureId;
    private Integer lastPosition;
}